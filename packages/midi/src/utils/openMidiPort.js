module.exports = (midiPortName, inputOrOutput, type) => {
  const numberOfPorts = inputOrOutput.getPortCount();
  if (numberOfPorts === 0) {
    throw new Error(`No MIDI ${type} ports available`);
  }
  for (let i = 0; i < numberOfPorts; i++) {
    // in Windows, the midi port name gets a number appended
    // at the end, in macOS and Linux, it doesn't, that's
    // why we use "startsWith" here
    if (!inputOrOutput.getPortName(i).startsWith(midiPortName)) {
      continue;
    }
    inputOrOutput.openPort(i);
    return;
  }
  throw new Error(`MIDI ${type} port ${midiPortName} not found!`);
}
