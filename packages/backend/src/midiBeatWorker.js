const { isMainThread, parentPort, workerData } = require("worker_threads");
const { START_PLAYING, STOP_PLAYING, STOP_WORKER } = require("./constants");

if (isMainThread) {
  throw new Error(
    "Module midiBeatWorker.js may only be used as a worker thread"
  );
}
let nextBeatTime = null;
let running = true;
let beats = 0;
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
    parentPort.postMessage({});
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
  console.log("BEAT!", ++beats);
}
