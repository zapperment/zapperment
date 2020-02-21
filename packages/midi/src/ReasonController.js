const MidiController = require('./MidiController');

const controllerNumbers = {
  "rotary1": 71,
  "rotary2": 72,
  "rotary3": 73,
  "rotary4": 74,
  "button1": 75,
  "button2": 76,
  "button3": 77,
  "button4": 78
};

module.exports = class extends MidiController {
  #send = (track, controller, value) => {
    console.log(
      `track=${track} – controller=${controller} (${controllerNumbers[controller]}) – val=${value}`
    );
    super.sendControlChange(track, controllerNumbers[controller], value);
  };

  changeScene(commands) {
    for (const { track, controller, value } of commands) {
      this.#send(track, controller, value);
    }
  }
};
