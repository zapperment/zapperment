const openSocket = require("socket.io");
const { STATS_NEW_CLAP, STATS_NEW_SHARED_CLAPS } = require("@zapperment/shared");

const { loop } = require("../model/loop");

module.exports = {
  configure: app => {
    const io = openSocket(app);
    io.set("origins", "*:*");

    io.on("connection", socket => {
      socket.on(STATS_NEW_CLAP, () => {
        console.log("CLAPPED!");
        loop.stats.claps++;
        io.emit(STATS_NEW_SHARED_CLAPS, loop.stats.claps, { for: 'everyone' });
      });
    });
    return io;
  }
};
