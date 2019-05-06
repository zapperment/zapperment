const http = require("http");
const openSocket = require("socket.io");
const path = require("path");
const { Worker } = require("worker_threads");
const { START_PLAYING } = require("./constants");
const { BEAT, STATS_CLAP } = require("@zapperment/shared");
const { initialTempo, port } = require("./config");

module.exports = () => {
  const app = http.createServer();
  const io = openSocket(app);
  io.set("origins", "*:*");
  const midiBeat = new Worker(path.join(__dirname, "./midiBeatWorker.js"), {
    workerData: { tempo: initialTempo }
  });

  midiBeat.postMessage(START_PLAYING);

  app.listen(port);

  midiBeat.on("message", message => {
    switch (message) {
      case BEAT:
        io.emit(BEAT, { for: "everyone" });
        break;
      default:
    }
  });

  io.on('connection', (socket) => {
   socket.on(STATS_CLAP, () => {
     console.log("clap received");
   });
 });
};
