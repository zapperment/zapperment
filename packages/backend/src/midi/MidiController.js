const controllerNames = {
  71: "rotary1",
  72: "rotary2",
  73: "rotary3",
  74: "rotary4",
  75: "button1",
  76: "button2",
  77: "button3",
  78: "button4"
};

module.exports = class {
  #midiInterface = null;

  constructor({ midiInterface }) {
    this.#midiInterface = midiInterface;
  }

  #send = (channel, controller, value) => {
    console.log(
      `ch=${channel} – ctl=${controller} (${controllerNames[controller]}) – val=${value}`
    );
    this.#midiInterface.sendControl(channel, controller, value);
  };

  changeScene(midiCommands) {
    for (const { channel, controller, value } of midiCommands) {
      this.#send(channel, controller, value);
    }
  }
};
