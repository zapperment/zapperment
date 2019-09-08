const { Storage } = require("./storage");
const http = require("http");
const express = require("express");
const socket = require("./socket");
const path = require("path");
const audio = require("osx-audio");
const lame = require("lame");
const audioInput = new audio.Input();
const { Worker } = require("worker_threads");
const { START_PLAYING, STOP_PLAYING } = require("./constants");
const {
  BEAT,
  NEW_LOOP,
  STATS_RESET_CLAP,
  STATS_RESET_BOO
} = require("@zapperment/shared");
const { initialTempo, barsPerLoop, port } = require("./config");
const { updateScene } = require("./model/loop");

let midiBeat = null;

process.on("SIGTERM", stop);
process.on("SIGINT", stop);

const encoder = new lame.Encoder({
  // input
  channels: 2, // 2 channels (left and right)
  bitDepth: 16, // 16-bit samples
  sampleRate: 44100, // 44,100 Hz sample rate

  // output
  bitRate: 128,
  outSampleRate: 22050,
  mode: lame.STEREO
});
audioInput.pipe(encoder);

module.exports = async () => {
  const app = express();
  const server = http.Server(app);
  const io = socket.init(server);
  const storage = new Storage();

  app.use("/", express.static(`${__dirname}/../../frontend/build`));

  app.get("/stream.mp3", (req, res) => {
    res.set({
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked"
    });
    encoder.pipe(res);
  });
  try {
    await storage.init();
  } catch (err) {
    console.error("Error initializing storage in main app");
    console.error(err);
    process.exit(1);
  }

  midiBeat = new Worker(path.join(__dirname, "./midiBeatWorker.js"), {
    workerData: { tempo: initialTempo, barsPerLoop }
  });

  midiBeat.on("message", message => {
    switch (message.type) {
      case BEAT:
        io.emit(BEAT, { for: "everyone" });
        break;
      case NEW_LOOP:
        updateScene(storage, message.data);
        io.emit(STATS_RESET_CLAP, { for: "everyone" });
        io.emit(STATS_RESET_BOO, { for: "everyone" });
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
