const { Output } = require("midi");
const openMidiPort = require("./openMidiPort");

module.exports = (midiPortName, isVirtual = false) => {
  const output = new Output();
  openMidiPort(midiPortName, output, "output", isVirtual);
  return output;
};
