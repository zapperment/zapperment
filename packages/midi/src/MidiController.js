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

  changeScene(commands) {
    for (const [trackId, controls] of Object.entries(commands)) {
      for (const [controlId, value] of Object.entries(controls)) {
        this.send(trackId, controlId, value);
      }
    }
  }

  parseTrackId(trackId) {
    let track;
    try {
      [, track] = trackId.match(/^track([1-9][0-6]*)$/);
    } catch {
      throw new Error(`Invalid track identifier: ${trackId}`);
    }
    return parseInt(track, 10);
  }
};
