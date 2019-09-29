const createIo = require("socket.io");

const {
  STATS_NEW_CLAP,
  STATS_NEW_SHARED_CLAPS,
  STATS_NEW_BOO,
  STATS_NEW_SHARED_BOOS
} = require("@zapperment/shared");

module.exports = ({ loopManager, server }) => {
  const io = createIo(server);
  io.set("origins", "*:*");

  io.on("connection", socket => {
    socket.on(STATS_NEW_CLAP, () => {
      console.log("CLAPPED!");
      loopManager.processClap();
      io.emit(STATS_NEW_SHARED_CLAPS, loopManager.claps, {
        for: "everyone"
      });
    });
    socket.on(STATS_NEW_BOO, () => {
      console.log("BOO'D!");
      loopManager.processBoo();
      io.emit(STATS_NEW_SHARED_BOOS, loopManager.boos, {
        for: "everyone"
      });
    });
  });
  return io;
};
