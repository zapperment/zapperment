const { isMainThread, parentPort, workerData } = require("worker_threads");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED
} = require("./constants");
const { BEAT } = require("@zapperment/shared");
const { midiPortName } = require("./config");
const MidiClock = require('./MidiClock');
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
let running = true;
let midiClock = null;
let midiOut = jzz()
  .openMidiOut(midiPortName)
  .or("Cannot open MIDI Out port!");
let clockCounter = 0;

parentPort.on("message", message => {
  switch (message) {
    case START_PLAYING:
      midiOut.send(jzz.MIDI.start());
      midiClock = new MidiClock(tempo);
      break;
    case STOP_PLAYING:
      midiOut.send(jzz.MIDI.stop());
      midiClock = null;
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
  if (midiClock && midiClock.hasTicked()) {
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
