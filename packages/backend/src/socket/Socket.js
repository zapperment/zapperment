/**
 * Socket
 *
 * Controls communication between server and client.
 */

/* ----- IMPORTS ----- */

const createIo = require("socket.io");

const {
  STATS_NEW_CLAP,
  STATS_NEW_SHARED_CLAPS,
  STATS_NEW_BOO,
  STATS_NEW_SHARED_BOOS,
  BEAT,
  STATS_RESET_CLAP,
  STATS_RESET_BOO
} = require("@zapperment/shared");

/* ----- CLASS EXPORT ----- */

module.exports = class {

  /* ----- PRIVATE FIELDS ----- */

  #loopManager = null;
  #io = null;

  /* ----- CONSTRUCTOR ----- */

  constructor({ loopManager, server }) {
    this.#loopManager = loopManager;
    this.#io = createIo(server);
    this.#io.set("origins", "*:*");
    this.#io.on("connection", this.#onConnection);
  }

  /* ----- PUBLIC METHODS ----- */

  emitBeat() {
    this.#emit(BEAT);
  }

  emitStatsReset() {
    this.#emit(STATS_RESET_BOO);
    this.#emit(STATS_RESET_CLAP);
  }

  /* ----- PRIVATE METHODS ----- */

  #emit = (...data) => this.#io.emit(...data);

  #onConnection = socket => {
    socket.on(STATS_NEW_CLAP, this.#onClap);
    socket.on(STATS_NEW_BOO, this.#onBoo);
  };

  #onClap = () => {
    console.log("CLAPPED!");
    this.#loopManager.processClap();
    this.#emit(STATS_NEW_SHARED_CLAPS, this.#loopManager.claps);
  };

  #onBoo = () => {
    console.log("BOO'D!");
    this.#loopManager.processBoo();
    this.#emit(STATS_NEW_SHARED_BOOS, this.#loopManager.boos);
  }
};
