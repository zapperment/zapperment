const openSocket = require("socket.io");
const { STATS_NEW_CLAP } = require("@zapperment/shared");

const { loop } = require("../loop");

module.exports = {
  configure: app => {
    const io = openSocket(app);
    io.set("origins", "*:*");

    io.on("connection", socket => {
      socket.on(STATS_NEW_CLAP, () => {
        console.log("CLAPPED!"); // PH_TODO
        loop.stats.claps++;
      });
    });
    return io;
  }
};
