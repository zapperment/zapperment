const { Output } = require("midi");
const openMidiPort = require('./openMidiPort');

module.exports = midiPortName => {
  const output = new Output();
  openMidiPort(midiPortName, output, "output");
  return output;
};
