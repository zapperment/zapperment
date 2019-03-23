const { isMainThread, parentPort, workerData } = require("worker_threads");
const { STOP_WORKER } = require("./constants");

if (isMainThread) {
  throw new Error(
    "Module timeoutWorker.js may only be used as a worker thread"
  );
}

const time = Date.now();
let running = true;
parentPort.on(
  "message",
  message => message === STOP_WORKER && (running = false)
);

while (true) {
  if (!running || time + workerData.time <= Date.now()) {
    parentPort.postMessage({});
    break;
  }
}
