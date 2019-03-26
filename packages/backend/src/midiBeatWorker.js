const { isMainThread, parentPort, workerData } = require("worker_threads");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED,
} = require("./constants");
const { BEAT } = require('@zapperment/shared');
const { midiPortName } = require("./config");
const jzz = require("jzz");

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}
let nextBeatTime = null;
let running = true;
const beatInterval = 60000 / workerData.tempo;

parentPort.on("message", message => {
  switch (message) {
    case START_PLAYING:
      nextBeatTime = Date.now();
      break;
    case STOP_PLAYING:
      nextBeatTime = null;
      break;
    case STOP_WORKER:
      running = false;
      break;
    default:
  }
});

function run() {
  if (!running) {
    parentPort.postMessage(WORKER_STOPPED);
    return;
  }
  if (nextBeatTime && Date.now() > nextBeatTime) {
    beat();
    nextBeatTime = Date.now() + beatInterval;
  }
  setTimeout(run);
}
run();

function beat() {
  jzz()
    .openMidiOut(midiPortName)
    .or("Cannot open MIDI Out port!")
    .send([0x90, 60, 127]) // note on
    .wait(500)
    .send([0x80, 60, 0]); // note off
  parentPort.postMessage(BEAT);
}
