const { isMainThread, parentPort, workerData } = require("worker_threads");
const { Storage } = require("../storage");
const { SceneBuilder } = require("../model");
const jzz = require("jzz");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED
} = require("../constants");

// PH_TODO: enable use of all four MIDI ports
// https://github.com/technology-ebay-de/zapperment/issues/56
const { midiPortNameA } = require("../config");

const MidiClock = require("./MidiClock");
const MidiController = require("./MidiController");

const { tempo, barsPerLoop } = workerData;
const clocksPerBeat = 24;
const clocksPerBar = clocksPerBeat * 4;
const clocksPerLoop = clocksPerBar * barsPerLoop;
const sceneChangeTicksInAdvance = 10;

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}

(async () => {
  const storage = new Storage();
  try {
    await storage.init();
  } catch (err) {
    console.error("Error initializing storage in midi beat worker thread");
    console.error(err);
    process.exit(1);
  }
  const sceneBuilder = new SceneBuilder({ storage });
  let running = true;
  let midiClock = null;
  const midiOut = jzz()
    .openMidiOut(midiPortNameA)
    .or("Cannot open MIDI Out port!");
  const midiController = new MidiController(midiOut);
  let clockCounter = 0;
  await sceneBuilder.init();
  loop();

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
      if ((clockCounter + sceneChangeTicksInAdvance) % clocksPerLoop === 0) {
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
    const { scene, midiCommands } = sceneBuilder.buildNewScene();
    midiController.changeScene(midiCommands);
    console.info(
      `NEW SCENE:\n${scene.channels
        .map(
          ({ meta: { name }, midi: { channel } }) => `ch=${channel} – ${name}`
        )
        .join("\n")}`
    );
    parentPort.postMessage({ type: NEW_LOOP, data: scene });
  }
})();
