const db = require('./db');
const http = require('http');
const socket = require('./socket');
const path = require('path');
const { Worker } = require('worker_threads');
const { START_PLAYING, STOP_PLAYING } = require('./constants');
const { BEAT, NEW_SCENE, STATS_RESET_CLAP } = require('@zapperment/shared');
const { initialTempo, barsPerLoop, port } = require('./config');
const { updateScene } = require('./loop');

let midiBeat = null;

process.on('SIGTERM', stop);
process.on('SIGINT', stop);

module.exports = () => {
  const app = http.createServer();
  const io = socket.configure(app);

  midiBeat = new Worker(path.join(__dirname, './midiBeatWorker.js'), {
    workerData: { tempo: initialTempo, barsPerLoop },
  });

  midiBeat.on('message', message => {
    switch (message.type) {
      case BEAT:
        io.emit(BEAT, { for: 'everyone' });
        break;
      case NEW_SCENE:
        updateScene(message.data);
        io.emit(STATS_RESET_CLAP, { for: 'everyone' });
        break;
      default:
    }
  });

  db.init(err => {
    if (err) {
      throw err;
    }
    midiBeat.postMessage(START_PLAYING);
    app.listen(port);
  });
};

function stop() {
  midiBeat.postMessage(STOP_PLAYING);
  process.exit(0);
}
