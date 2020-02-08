const { openMidiOut } = require("./utils");

module.exports = class {
  #midiOut = null;

  constructor({ midiPortName }) {
    try {
      this.#midiOut = openMidiOut(midiPortName);
    } catch (error) {
      this.#fatalError(error);
    }
  }

  sendStop() {
    this.#midiOut.sendMessage([0xfc]);
  }

  sendStart() {
    this.#midiOut.sendMessage([0xFA]);
  }

  sendClock() {
    this.#midiOut.sendMessage([0xF8]);
  }

  sendControl(channel, controller, value) {
    this.#midiOut.sendMessage([0xB0 + channel, controller, value])
  }

  #fatalError = error => {
    console.error(`Fatal error in MIDI interface module: ${error.message}`);
    process.exit(1);
  };
};
