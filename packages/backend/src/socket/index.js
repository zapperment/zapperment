const openSocket = require('socket.io');
const { STATS_CLAP, NEW_SCENE } = require('@zapperment/shared');

const { loop } = require('../loop');

module.exports = {
  configure: app => {
    const io = openSocket(app);
    io.set('origins', '*:*');

    io.on('connection', socket => {
      socket.on(STATS_CLAP, () => {
        console.log('CLAPPED!'); // PH_TODO
        loop.stats.claps++;
      });
    });
    return io;
  },
};
