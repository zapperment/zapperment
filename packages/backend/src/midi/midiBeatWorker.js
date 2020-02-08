const { isMainThread, parentPort, workerData } = require("worker_threads");
const { Storage } = require("../storage");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED,
  NEW_SCENE,
  EXIT
} = require("../constants");

const { midiPortName } = require("../config");

const MidiInterface = require("./MidiInterface");
const MidiClock = require("./MidiClock");
const MidiController = require("./MidiController");

const { tempo, barsPerLoop } = workerData;
const clocksPerBeat = 24;
const clocksPerBar = clocksPerBeat * 4;
const clocksPerLoop = clocksPerBar * barsPerLoop;
const sceneChangeTicksInAdvance = 1;

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}

(async () => {
  let scene = null;
  let midiCommands = null;
  const storage = new Storage();
  try {
    await storage.init();
  } catch (err) {
    console.error("Error initializing storage in midi beat worker thread");
    console.error(err);
    process.exit(1);
  }
  let running = true;
  let midiClock = null;
  const midiInterface = new MidiInterface({ midiPortName });
  const midiController = new MidiController({ midiInterface });
  let clockCounter = 0;

  parentPort.on("message", ({ type, data }) => {
    switch (type) {
      case START_PLAYING:
        midiInterface.sendStart();
        midiClock = new MidiClock(tempo);
        break;
      case STOP_PLAYING:
        midiInterface.sendStop();
        midiClock = null;
        break;
      case STOP_WORKER:
        running = false;
        break;
      case NEW_SCENE:
        ({ scene, midiCommands } = data);
        break;
      case EXIT:
        midiInterface.sendStop();
        midiClock = null;
        process.exit(0);
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
    midiInterface.sendClock();
  }

  function beat() {
    console.log("**** **** beat");
    parentPort.postMessage({ type: BEAT });
  }

  function bar() {
    console.log("**** bar");
  }

  function loop() {
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
