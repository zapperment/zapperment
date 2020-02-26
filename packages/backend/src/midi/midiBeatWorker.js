const { isMainThread, parentPort, workerData } = require("worker_threads");
const { Storage } = require("../storage");
const { BEAT, NEW_LOOP } = require("@zapperment/shared");
const {
  START_PLAYING,
  STOP_PLAYING,
  STOP_WORKER,
  WORKER_STOPPED,
  NEW_SCENE,
  EXIT,
  DAW_REASON,
  TICKS_PER_BEAT
} = require("../constants");

const {
  midiPortName,
  abletonLiveSetSceneInAdvance,
  reasonSetSceneInAdvance
} = require("../config");

const {
  MidiInterface,
  MidiClock,
  ReasonController,
  AbletonLiveController
} = require("@zapperment/midi");

const { tempo, barsPerLoop, beatsPerBar, daw } = workerData;
const ticksPerBar = TICKS_PER_BEAT * beatsPerBar;
const ticksPerLoop = ticksPerBar * barsPerLoop;

function parseMusicalTime(s) {
  const [vals, unit] = s.split(" ");
  if (vals === undefined || unit === undefined) {
    throw new Error(
      `Invalid value “${s}” in .env config for SET_SCENE_IN_ADVANCE`
    );
  }
  const val = parseInt(vals, 10);
  if (isNaN(val)) {
    throw new Error(
      `Invalid value “${s}” in .env config for SET_SCENE_IN_ADVANCE`
    );
  }
  switch (unit) {
    case "tick":
    case "ticks":
      return val;
    case "beat":
    case "beats":
      return val * TICKS_PER_BEAT;
    case "bar":
    case "bars":
      return val * ticksPerBar;
    default:
      throw new Error(
        `Invalid unit “${unit}” in .env config for SET_SCENE_IN_ADVANCE`
      );
  }
}

/* For Reason, sending the scene change at just the right time is critical,
 * in Ableton Live, it doesn't matter */
const sceneChangeClocksInAdvance =
  daw === DAW_REASON
    ? parseMusicalTime(reasonSetSceneInAdvance)
    : parseMusicalTime(abletonLiveSetSceneInAdvance);

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}

(async () => {
  let scene = null;
  let commands = null;
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
  const midiController =
    daw === DAW_REASON
      ? new ReasonController({ midiInterface })
      : new AbletonLiveController({ midiInterface });
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
        ({ scene, commands } = data);
        break;
      case EXIT:
        midiInterface.sendStop();
        midiClock = null;
        process.exit(0);
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
      if ((clockCounter + sceneChangeClocksInAdvance) % ticksPerLoop === 0) {
        loop();
      }
      if (clockCounter % ticksPerBar === 0) {
        bar();
      }
      if (clockCounter % TICKS_PER_BEAT === 0) {
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
    midiController.changeScene(commands);
    console.info(
      `NEW SCENE:\n${scene.tracks
        .map(
          ({ meta: { name }, trackNumber }) => `track=${trackNumber} – ${name}`
        )
        .join("\n")}`
    );
    parentPort.postMessage({ type: NEW_LOOP, data: scene });
  }
})();
