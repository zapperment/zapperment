const jzz = require("jzz");

class MidiController {
  constructor(midiOut) {
    this.midiOut = midiOut;
  }

  send(channel, controller, value) {
    this.midiOut.send(jzz.MIDI.control(channel, controller, value));
  }

  changeScene(scene) {
    // mixer
    for (const { channel, muted } of scene.mixer) {
      this.send(0, channel + 101, muted ? 127 : 0);
    }
    // percussion
    this.send(1, scene.percussion.pattern + 101, 127);
    // bonanza bassline
    this.send(2, 102, scene.bonanza.pulsarLevel);
    this.send(2, 103, scene.bonanza.filter);
    this.send(2, 104, scene.bonanza.filterEnv);
    this.send(2, 105, scene.bonanza.lowCut ? 127 : 0);
    this.send(2, 106, scene.bonanza.rateOneEighth ? 127 : 0);
    this.send(2, 107, scene.bonanza.sawSolo ? 127 : 0);
  }
}

module.exports = MidiController;
