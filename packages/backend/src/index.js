const path = require("path");
const runWorker = require("./runWorker");
const { START_PLAYING } = require("./constants");

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
    tempo: 120
  }
);

midiBeat.postMessage(START_PLAYING);
