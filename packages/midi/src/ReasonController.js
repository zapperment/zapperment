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
  send = (channel, controller, value) => {
    console.log(
      `ch=${channel} – controller=${controller} (${controllerNumbers[controller]}) – val=${value}`
    );
    super.send(channel, controllerNumbers[controller], value);
  };

  changeScene(midiCommands) {
    for (const { channel, controller, value } of midiCommands) {
      this.send(channel, controller, value);
    }
  }
};
