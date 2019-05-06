const { isMainThread, parentPort, workerData } = require("worker_threads");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED
} = require("./constants");
const { BEAT } = require("@zapperment/shared");
const { midiPortName } = require("./config");
const jzz = require("jzz");

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}
let nextClockTime = null;
let running = true;
let midiOut = jzz()
  .openMidiOut(midiPortName)
  .or("Cannot open MIDI Out port!");
const clockInterval = 60000 / workerData.tempo / 24;
let clockCounter = 0;

parentPort.on("message", message => {
  switch (message) {
    case START_PLAYING:
      midiOut.send(jzz.MIDI.start());
      nextClockTime = Date.now();
      break;
    case STOP_PLAYING:
      midiOut.send(jzz.MIDI.stop());
      nextClockTime = null;
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
  const now = Date.now();
  if (nextClockTime && now >= nextClockTime) {
    if (clockCounter === 0) {
      beat();
    }
    clock();
    if (++clockCounter === 24) {
      clockCounter = 0;
    }
    nextClockTime = now + clockInterval;
  }
  setImmediate(run);
}
setTimeout(run, 100);

function clock() {
  midiOut.send(jzz.MIDI.clock());
}

function beat() {
  parentPort.postMessage(BEAT);
}
