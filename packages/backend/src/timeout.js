const uuidv4 = require("uuid/v4");
const runWorker = require("./runWorker");
const path = require("path");
const { STOP_WORKER } = require("./constants");

const timeoutState = {};
const intervalState = {};

const setTimeout = (callback, time) => {
  const id = uuidv4();

  timeoutState[id] = runWorker(
    path.join(__dirname, "./timeoutWorker.js"),
    err => {
      if (!timeoutState[id]) {
        return null;
      }

      timeoutState[id] = null;

      if (err) {
        return callback(err);
      }

      callback(null);
    },
    {
      time
    }
  );

  return id;
};

const cancelTimeout = id => {
  if (timeoutState[id]) {
    timeoutState[id].postMessage(STOP_WORKER);
    timeoutState[id] = undefined;
    return true;
  }

  return false;
};

const cancelInterval = id => {
  const timeoutId = intervalState[id];

  if (timeoutId) {
    intervalState[id] = undefined;
    cancelTimeout(timeoutId);
    return true;
  }

  return false;
};

const setInterval = (callback, time) => {
  const id = uuidv4();

  function execute() {
    intervalState[id] = setTimeout(err => {
      if (err) {
        console.error(err);
        return;
      }
      callback();
      execute();
    }, time);
  }

  execute();
  return id;
};

module.exports = {
  setTimeout,
  cancelTimeout,
  setInterval,
  cancelInterval
};
