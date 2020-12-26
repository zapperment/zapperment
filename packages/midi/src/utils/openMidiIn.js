const { Input } = require("midi");
const openMidiPort = require('./openMidiPort');

module.exports = midiPortName => {
  const input = new Input();
  openMidiPort(midiPortName, input, "input");
  return input;
};
