const { join } = require("path");
const { Worker } = require("worker_threads");

module.exports = (path, options) =>
  new Worker(join(__dirname, "..", path), options);
