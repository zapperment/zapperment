const { Storage } = require("./storage");
const http = require("http");
const express = require("express");
const { Socket } = require("./socket");
const path = require("path");
const { Worker } = require("worker_threads");
const {
  START_PLAYING,
  BUILD_SCENE,
  NEW_SCENE,
  STOP_PLAYING,
  EXIT
} = require("./constants");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const { port, track } = require("./config");
const { LoopManager } = require("./model");
const { loadTrack } = require("./track");

module.exports = async () => {
  let threadsRunning = 0;
  const { barsPerLoop, tempo } = loadTrack(track);
  const app = express();
  const server = http.Server(app);
  const storage = new Storage();

  app.use("/", express.static(`${__dirname}/../../frontend/build`));

  try {
    await storage.init();
  } catch (err) {
    console.error("Error initializing storage in main app");
    console.error(err);
    process.exit(1);
  }

  const loopManager = new LoopManager({ storage });
  const socket = new Socket({ loopManager, server });

  const midiBeat = new Worker(
    path.join(__dirname, "./midi/midiBeatWorker.js"),
    {
      workerData: { tempo, barsPerLoop }
    }
  );
  threadsRunning++;

  const sceneBuilder = new Worker(
    path.join(__dirname, "./model/sceneBuilderWorker.js")
  );
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
      case NEW_SCENE:
        midiBeat.postMessage({ type: NEW_SCENE, data });
        if (!isPlaying) {
          loopManager.init(data.scene);
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
