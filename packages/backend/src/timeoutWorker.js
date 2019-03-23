const { parentPort, workerData } = require("worker_threads");
const { STOP_WORKER } = require("./constants");

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
