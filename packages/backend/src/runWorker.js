const { Worker } = require("worker_threads");

module.exports = (path, callback, workerData) => {
  const worker = new Worker(path, { workerData });

  worker.on("message", callback.bind(null, null));
  worker.on("error", callback);

  worker.on("exit", exitCode => {
    if (exitCode === 0) {
      return null;
    }

    return callback(new Error(`Worker has stopped with code ${exitCode}`));
  });

  return worker;
};
