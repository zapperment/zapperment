const { Storage } = require("./storage");
const http = require("http");
const express = require("express");
const { Socket } = require("./socket");
const path = require("path");
const { Worker } = require("worker_threads");
const { START_PLAYING } = require("./constants");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const { initialTempo, barsPerLoop, port } = require("./config");
const { LoopManager } = require("./model");

// PH_TODO: enable use of all four MIDI ports
// https://github.com/technology-ebay-de/zapperment/issues/56
const { midiPortNameA } = require("./config");

const jzz = require("jzz");

let midiBeat = null;

/* [PH 13 Oct 19]
 * This is a hack – it would be nice if the MIDI Beat Worker could
 * send a MIDI stop message when it is terminated, but I couldn't find
 * a clean way to achieve this. The dirty way: start.js module sends
 * the MIDI stop message in its SIGTERM/SIGINT handler (see function
 * “stop” below) to stop Reason playing.
 * See my post on SO: https://stackoverflow.com/questions/58365748/how-to-prevent-a-node-js-12-worker-thread-from-terminating-immediately
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

  midiBeat = new Worker(path.join(__dirname, "./midi/midiBeatWorker.js"), {
    workerData: { tempo: initialTempo, barsPerLoop }
  });

  midiBeat.on("message", message => {
    switch (message.type) {
      case BEAT:
        socket.emitBeat();
        break;
      case NEW_LOOP:
        loopManager.updateScene(message.data);
        socket.emitStatsReset();
        break;
      default:
    }
  });

  midiBeat.on("error", err => console.error("Beat worker reported error", err));
  midiBeat.on("exit", code =>
    console.info(`Beat worker exited with code ${code}`)
  );

  midiBeat.postMessage(START_PLAYING);
  server.listen(port);
};
