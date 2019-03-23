const { isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  throw new Error("Module dummyWorker.js may only be used as a worker thread");
}

const doCalculations = () => {
  const collection = [];

  for (let i = 0; i < 1000000; i += 1) {
    collection[i] = Math.round(Math.random() * 100000);
  }

  return collection.sort((a, b) => {
    if (a > b) {
      return 1;
    }

    return -1;
  });
};

parentPort.on("message", data => {
  const result = doCalculations(data);
  parentPort.postMessage(result);
});
