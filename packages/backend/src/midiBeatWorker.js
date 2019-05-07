const { isMainThread, parentPort, workerData } = require("worker_threads");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED,
  NEW_SCENE
} = require("./constants");
const { BEAT } = require("@zapperment/shared");
const { midiPortName } = require("./config");
const MidiClock = require("./MidiClock");
const MidiController = require("./MidiController");
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
const midiOut = jzz()
  .openMidiOut(midiPortName)
  .or("Cannot open MIDI Out port!");
const midiController = new MidiController(midiOut);
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
    if ((clockCounter + 1) % clocksPerLoop === 0) {
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
  console.log("**** **** beat");
  parentPort.postMessage({ type: BEAT });
}

function bar() {
  console.log("**** bar");
}

function loop() {
  const scene = makeAScene();
  midiController.changeScene(scene);
  parentPort.postMessage({ type: NEW_SCENE, data: scene });
}

function randomBool() {
  return Math.random() < 0.5;
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeAScene() {
  return {
    mixer: [
      // bass
      { channel: 1, muted: randomBool() },
      // kick
      { channel: 2, muted: randomBool() },
      // tom
      { channel: 3, muted: randomBool() },
      // hi hat
      { channel: 4, muted: randomBool() },
      // fx
      { channel: 5, muted: randomBool() },
      // spel gtr 1
      { channel: 6, muted: randomBool() },
      // spel gtr 2
      { channel: 7, muted: randomBool() },
      // spel gtr 3
      { channel: 8, muted: randomBool() },
      // spel gtr 4
      { channel: 9, muted: randomBool() },
      // e-piano
      { channel: 10, muted: randomBool() }
    ],
    percussion: {
      pattern: randomInt(0, 6)
    }
  };
}
