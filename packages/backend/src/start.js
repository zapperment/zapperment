const { Storage } = require("./storage");
const http = require("http");
const express = require("express");
const { Socket } = require("./socket");
const path = require("path");
const { Worker } = require("worker_threads");
const { START_PLAYING, STOP_PLAYING } = require("./constants");
const {
  BEAT,
  NEW_LOOP,
} = require("@zapperment/shared");
const { initialTempo, barsPerLoop, port } = require("./config");
const { LoopManager } = require("./model");

let midiBeat = null;

process.on("SIGTERM", stop);
process.on("SIGINT", stop);

module.exports = async () => {
  const app = express();
  const server = http.Server(app);
  const storage = new Storage();

  app.use("/", express.static(`${__dirname}/../../frontend/build`));

  try {
    await storage.init();
  } catch (err) {
    console.error("Error initializing storage in main app");
    console.error(err);
    process.exit(1);
  }

  const loopManager = new LoopManager({ storage });
  const socket = new Socket({loopManager,server});

  midiBeat = new Worker(path.join(__dirname, "./midiBeatWorker.js"), {
    workerData: { tempo: initialTempo, barsPerLoop }
  });

  midiBeat.on("message", message => {
    switch (message.type) {
      case BEAT:
        socket.emitBeat();
        break;
      case NEW_LOOP:
        loopManager.updateScene(message.data);
        socket.emitStatsReset();
        break;
      default:
    }
  });

  midiBeat.on("error", err => console.error("Beat worker reported error", err));
  midiBeat.on("exit", code =>
    console.info(`Beat worker exited with code ${code}`)
  );

  midiBeat.postMessage(START_PLAYING);
  server.listen(port);
};

function stop() {
  midiBeat.postMessage(STOP_PLAYING);
  process.exit(0);
}
