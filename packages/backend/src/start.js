const db = require('./db');
const http = require('http');
const socket = require('./socket');
const path = require('path');
const { Worker } = require('worker_threads');
const { START_PLAYING } = require('./constants');
const { BEAT } = require('@zapperment/shared');
const { initialTempo, port } = require('./config');

module.exports = () => {
  const app = http.createServer();
  const io = socket.configure(app);

  const midiBeat = new Worker(path.join(__dirname, './midiBeatWorker.js'), {
    workerData: { tempo: initialTempo },
  });

  midiBeat.on('message', message => {
    switch (message) {
      case BEAT:
        io.emit(BEAT, { for: 'everyone' });
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
