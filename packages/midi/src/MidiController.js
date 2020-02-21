module.exports = class {
  #midiInterface = null;

  constructor({ midiInterface }) {
    this.#midiInterface = midiInterface;
  }

  sendControlChange(...args) {
    this.#midiInterface.sendControlChange(...args);
  }

  sendNoteOn(...args) {
    this.#midiInterface.sendNoteOn(...args);
  }

  sendNoteOff(...args) {
    this.#midiInterface.sendNoteOff(...args);
  }
};
