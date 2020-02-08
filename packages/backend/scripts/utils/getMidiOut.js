const jzz = require("jzz");

module.exports = port =>
  jzz()
    .openMidiOut(port)
    .or(() => {
      console.error(`Cannot open MIDI out port ${port}!`);
      process.exit(1);
    });
