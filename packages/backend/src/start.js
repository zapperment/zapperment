const { Storage } = require("@zapperment/storage");
const http = require("http");
const express = require("express");
const { Socket } = require("./socket");
const { START_PLAYING, BUILD_SCENE, NEW_SCENE, EXIT } = require("./constants");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const { port, composition, databaseUrl } = require("./config");
const { LoopManager } = require("./model");
const { loadComposition } = require("./composition");
const { startWorker } = require("./utils");

module.exports = async () => {
  let threadsRunning = 0;
  const { barsPerLoop, beatsPerBar, tempo, daw } = loadComposition(composition);
  const app = express();
  const server = http.Server(app);
  const storage = new Storage();

  app.use("/", express.static(`${__dirname}/../../frontend/build`));

  try {
    await storage.init({ databaseUrl });
  } catch (err) {
    console.error("Error initializing storage in main app");
    console.error(err);
    process.exit(1);
  }

  const loopManager = new LoopManager({ storage });
  const socket = new Socket({ loopManager, server });

  const midiBeat = startWorker("./midi/midiBeatWorker.js", {
    workerData: { barsPerLoop, beatsPerBar, tempo, daw }
  });
  threadsRunning++;

  const sceneBuilder = startWorker("./model/sceneBuilderWorker.js");
  threadsRunning++;

  midiBeat.on("message", ({ type, data }) => {
    switch (type) {
      case BEAT:
        socket.emitBeat();
        break;
      case NEW_LOOP:
        loopManager.updateScene(data);
        socket.emitStatsReset();
        sceneBuilder.postMessage({ type: BUILD_SCENE });
        break;
      default:
    }
  });

  midiBeat.on("error", err => console.error("Beat worker reported error", err));
  midiBeat.once("exit", code => {
    console.info(`Beat worker exited with code ${code}`);
    if (--threadsRunning === 0) {
      process.exit(code);
    }
  });

  let isPlaying = false;

  sceneBuilder.on("message", ({ type, data }) => {
    switch (type) {
      // When the scene builder has created a new scene…
      case NEW_SCENE:
        // Tell the MIDI beat worker to set the scene (i.e. send controller data to the connected DAW)
        midiBeat.postMessage({ type: NEW_SCENE, data });
        // If music playback hasn't started yet…
        if (!isPlaying) {
          // Give the loop manager the data of the scene that has been created
          loopManager.init(data.scene);
          // Tell the MIDI beat worker to start playing
          midiBeat.postMessage({ type: START_PLAYING });
          isPlaying = true;
        }
        break;
      default:
    }
  });

  sceneBuilder.on("error", err =>
    console.error("Scene builder worker reported error", err)
  );

  sceneBuilder.once("exit", code => {
    console.info(`Scene builder worker exited with code ${code}`);
    if (--threadsRunning === 0) {
      process.exit(code);
    }
  });

  function exit() {
    // Make sure Reason stops playing when Zapperment is terminated
    midiBeat.postMessage({ type: EXIT });
    sceneBuilder.postMessage({ type: EXIT });
  }

  process.on("SIGTERM", () => {
    exit();
  });
  process.on("SIGINT", () => {
    exit();
  });

  sceneBuilder.postMessage({ type: BUILD_SCENE });
  server.listen(port);
};
