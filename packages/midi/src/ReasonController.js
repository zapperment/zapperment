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
  #send = (trackId, controlId, value) => {
    let track;
    try {
      [, track] = trackId.match(/^track([1-9][0-6]*)$/);
    } catch {
      throw new Error(`Invalid track identifier: ${trackId}`);
    }
    console.log(
      `Track ${track}: ${prettyControlNames[controlId]} (MIDI control ${controlNumbers[controlId]}) set to ${value}`
    );
    super.sendControlChange(parseInt(track, 10), controlNumbers[controlId], value);
  };

  changeScene(commands) {
    for (const [trackId, controls] of Object.entries(commands)) {
      for (const [controlId, value] of Object.entries(controls)) {
        this.#send(trackId, controlId, value);
      }
    }
  }
};
