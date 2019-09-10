const createIo = require("socket.io");

const {
  STATS_NEW_CLAP,
  STATS_NEW_SHARED_CLAPS,
  STATS_NEW_BOO,
  STATS_NEW_SHARED_BOOS
} = require("@zapperment/shared");

const { loop } = require("../model/loop");

module.exports = app => {
  const io = createIo(app);
  io.set("origins", "*:*");

  io.on("connection", socket => {
    socket.on(STATS_NEW_CLAP, () => {
      console.log("CLAPPED!");
      loop.stats.claps++;
      io.emit(STATS_NEW_SHARED_CLAPS, loop.stats.claps, { for: "everyone" });
    });
    socket.on(STATS_NEW_BOO, () => {
      console.log("BOO'D!");
      loop.stats.boos++;
      io.emit(STATS_NEW_SHARED_BOOS, loop.stats.boos, { for: "everyone" });
    });
  });
  return io;
};
