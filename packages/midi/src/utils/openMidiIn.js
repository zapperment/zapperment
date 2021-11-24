const { Input } = require("midi");
const openMidiPort = require("./openMidiPort");

module.exports = (midiPortName, isVirtual = false) => {
  const input = new Input();
  openMidiPort(midiPortName, input, "input", isVirtual);
  return input;
};
