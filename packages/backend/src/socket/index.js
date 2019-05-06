const openSocket = require('socket.io');
const { STATS_CLAP } = require('@zapperment/shared');

module.exports = {
  configure: app => {
    const io = openSocket(app);

    io.set('origins', '*:*');

    io.on('connection', socket => {
      socket.on(STATS_CLAP, () => {
        console.log('clap received');
      });
    });

    return io;
  },
};
