const path = require("path");
const runWorker = require("./runWorker");
const { START_PLAYING } = require("./constants");
const { initialTempo } = require("./config");

module.exports = async () => {
  const midiBeat = runWorker(
    path.join(__dirname, "./midiBeatWorker.js"),
    err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("done");
    },
    {
      tempo: initialTempo
    }
  );

  midiBeat.postMessage(START_PLAYING);
};
