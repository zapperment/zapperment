const { Output } = require("midi");

module.exports = midiPortName => {
  const output = new Output();
  const numberOfPorts = output.getPortCount();
  if (numberOfPorts === 0) {
    throw new Error("No MIDI output ports available");
  }
  for (let i = 0; i < numberOfPorts; i++) {
    if (output.getPortName(i) !== midiPortName) {
      continue;
    }
    output.openPort(i);
    return output;
  }
  throw new Error(`MIDI output port ${midiPortName} not found`);
};
