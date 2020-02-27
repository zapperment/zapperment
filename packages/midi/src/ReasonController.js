const MidiController = require("./MidiController");

const controlNumbers = {
  rotary1: 71,
  rotary2: 72,
  rotary3: 73,
  rotary4: 74,
  button1: 75,
  button2: 76,
  button3: 77,
  button4: 78
};

const prettyControlNames = {
  rotary1: "Combinator rotary 1",
  rotary2: "Combinator rotary 2",
  rotary3: "Combinator rotary 3",
  rotary4: "Combinator rotary 4",
  button1: "Combinator button 1",
  button2: "Combinator button 2",
  button3: "Combinator button 3",
  button4: "Combinator button 4"
};

module.exports = class extends MidiController {
  send(trackId, controlId, value) {
    const track = this.parseTrackId(trackId);
    console.log(
      `Track ${track}: ${prettyControlNames[controlId]} set to ${value} (MIDI channel ${track} / control ${controlNumbers[controlId]})`
    );
    super.sendControlChange(track, controlNumbers[controlId], value);
  }
};
