module.exports = class {
  #midiInterface = null;

  constructor({ midiInterface }) {
    this.#midiInterface = midiInterface;
  }

  send(channel, controller, value) {
    this.#midiInterface.sendControl(channel, controller, value);
  };
};
