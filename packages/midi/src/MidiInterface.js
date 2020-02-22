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
    this.#midiOut.sendMessage([0xfa]);
  }

  sendClock() {
    this.#midiOut.sendMessage([0xf8]);
  }

  sendControlChange(channel, controller, value) {
    this.#midiOut.sendMessage([0xb0 + channel - 1, controller, value]);
  }

  sendNoteOn(channel, note, velocity = 127) {
    this.#midiOut.sendMessage([0x90 + channel - 1, note, velocity]);
  }

  sendNoteOff(channel, note, velocity = 0) {
    this.#midiOut.sendMessage([0x80 + channel - 1, note, velocity]);
  }

  #fatalError = error => {
    console.error(`Fatal error in MIDI interface module: ${error.message}`);
    process.exit(1);
  };
};
