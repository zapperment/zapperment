const { Storage } = require("./storage");
const http = require("http");
const express = require("express");
const { Socket } = require("./socket");
const path = require("path");
const { Worker } = require("worker_threads");
const { START_PLAYING, BUILD_SCENE, NEW_SCENE } = require("./constants");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const { port, track } = require("./config");
const { LoopManager } = require("./model");
const { loadTrack } = require("./track");

// PH_TODO: enable use of all four MIDI ports
// https://github.com/technology-ebay-de/zapperment/issues/56
const { midiPortNameA } = require("./config");

const jzz = require("jzz");

/* [PH 13 Oct 19]
 * This is a hack – it would be nice if the MIDI Beat Worker could
 * send a MIDI stop message when it is terminated, but I couldn't find
 * a clean way to achieve this. The dirty way: start.js module sends
 * the MIDI stop message in its SIGTERM/SIGINT handler (see function
 * “stop” below) to stop Reason playing.
 * https://github.com/technology-ebay-de/zapperment/issues/48
 */
const midiOut = jzz()
  .openMidiOut(midiPortNameA)
  .or("Cannot open MIDI Out port!");

// make sure no rogue MIDI is playing when Zapperment starts
midiOut.send(jzz.MIDI.stop());

process.on("SIGTERM", stop);
process.on("SIGINT", stop);

async function stop() {
  // Make sure Reason stops playing when Zapperment is terminated
  midiOut.send(jzz.MIDI.stop());
  process.exit(0);
}

module.exports = async () => {
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
  const sceneBuilder = new Worker(
    path.join(__dirname, "./model/sceneBuilderWorker.js")
  );

  midiBeat.on("message", ({ type, data }) => {
    switch (type) {
      case BEAT:
        socket.emitBeat();
        break;
      case NEW_LOOP:
        loopManager.updateScene(data);
        socket.emitStatsReset();
        sceneBuilder.postMessage(BUILD_SCENE);
        break;
      default:
    }
  });

  midiBeat.on("error", err => console.error("Beat worker reported error", err));
  midiBeat.on("exit", code =>
    console.info(`Beat worker exited with code ${code}`)
  );

  let isPlaying = false;

  sceneBuilder.on("message", ({ type, data }) => {
    switch (type) {
      case NEW_SCENE:
        midiBeat.postMessage({ type: NEW_SCENE, data });
        if (!isPlaying) {
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
  sceneBuilder.on("exit", code =>
    console.info(`Scene builder worker exited with code ${code}`)
  );

  sceneBuilder.postMessage(BUILD_SCENE);
  server.listen(port);
};
