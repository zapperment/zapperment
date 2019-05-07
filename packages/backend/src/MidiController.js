const jzz = require("jzz");

class MidiController {
  constructor(midiOut) {
    this.midiOut = midiOut;
  }

  changeScene(scene) {
    for (const { channel, muted } of scene.mixer) {
      this.midiOut.send(jzz.MIDI.control(0, channel + 101, muted ? 127 : 0));
    }
    this.midiOut.send(jzz.MIDI.control(1, scene.percussion.pattern + 101, 127))
  }
}

module.exports = MidiController;
