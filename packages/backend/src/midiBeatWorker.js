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
const { tempo, barsPerLoop } = workerData;
const clocksPerBeat = 24;
const clocksPerBar = clocksPerBeat * 4;
const clocksPerLoop = clocksPerBar * barsPerLoop;

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
const clockInterval = 60000 / tempo / clocksPerBeat;
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
    if (clockCounter % clocksPerLoop === 0) {
      loop();
    }
    if (clockCounter % clocksPerBar === 0) {
      bar();
    }
    if (clockCounter % clocksPerBeat === 0) {
      beat();
    }
    clock();
    nextClockTime = now + clockInterval;
    clockCounter++;
  }
  setImmediate(run);
}
setTimeout(run, 100);

function clock() {
  midiOut.send(jzz.MIDI.clock());
}

function beat() {
  console.log('**** **** beat');
  parentPort.postMessage(BEAT);
}

function bar() {
  console.log('**** bar');
}

function loop() {
  console.log('loop');
}
