const db = require('./db');
const http = require('http');
const socket = require('./socket');
const path = require('path');
const { Worker } = require('worker_threads');
const { START_PLAYING, STOP_PLAYING } = require('./constants');
const { BEAT, NEW_SCENE } = require('@zapperment/shared');
const { initialTempo, port } = require('./config');

let midiBeat = null;

process.on('SIGTERM', stop);
process.on('SIGINT', stop);

module.exports = () => {
  const app = http.createServer();
  const io = socket.configure(app);

  midiBeat = new Worker(path.join(__dirname, './midiBeatWorker.js'), {
    workerData: { tempo: initialTempo },
  });

  midiBeat.on('message', message => {
    switch (message) {
      case BEAT:
        io.emit(BEAT, { for: 'everyone' });
        break;
      case NEW_SCENE:
        // updateScene();
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
}
