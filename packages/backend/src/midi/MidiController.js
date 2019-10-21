const jzz = require("jzz");

module.exports = class {
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
    // nervomat
    this.send(0, 75, scene.nervomat.annoyMe ? 127 : 0);
  }
};
