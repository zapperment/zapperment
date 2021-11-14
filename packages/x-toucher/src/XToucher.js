const debug = require("debug")("zapperment:x-toucher");
const { MidiInterface } = require("@zapperment/midi");
const { SYSEX_MANUFACTURER } = require("./constants");
const { markCurrentScene } = require("./methods");

function isRotaryKnobPush(note) {
  return note <= 7 || (note >= 24 && note <= 31);
}

function getSceneFromRotaryKnobPushNote(note) {
  return note <= 7 ? note + 1 : note - 23;
}

class XToucher {
  #xTouchInterface;
  #reasonInterface;
  #currentDeviceName;
  #devices = {};
  #markCurrentScene;

  constructor() {
    this.#xTouchInterface = new MidiInterface({ midiPortName: "X-TOUCH MINI" });
    this.#reasonInterface = new MidiInterface({
      midiPortName: "Zapperment X-Toucher",
      isVirtual: true,
    });
    this.#markCurrentScene = markCurrentScene.bind(this);
    debug("X-Toucher created");
  }

  start() {
    this.#xTouchInterface.receiveMidiMessage((message) => {
      // debug("X-Touch → Reason:", message);
      this.#reasonInterface.sendMidiMessage(message);
    });

    this.#xTouchInterface.receiveNoteOn(11, (note) => {
      if (!isRotaryKnobPush(note)) {
        return;
      }
      const scene = getSceneFromRotaryKnobPushNote(note);
      debug(`Scene ${scene} selected for device “${this.#currentDeviceName}”`);
      this.currentScene = scene;
      this.#markCurrentScene();
    });

    this.#reasonInterface.receiveMidiMessage((message) => {
      // debug("Reason → X-Touch:", message);
      this.#xTouchInterface.sendMidiMessage(message);
    });

    this.#reasonInterface.receiveSysEx(SYSEX_MANUFACTURER, (message) => {
      const data = JSON.parse(String.fromCharCode(...message));
      debug("Data received from Reason:");
      debug(data);
      if (data.deviceName) {
        this.#currentDeviceName = data.deviceName;
        debug(`Received device name: “${this.#currentDeviceName}”`);
        if (!this.#devices[this.#currentDeviceName]) {
          this.#devices[this.#currentDeviceName] = {
            scene: 1,
          };
        }
      }
    });
    debug("X-Toucher started");
  }

  get currentScene() {
    return this.#devices[this.#currentDeviceName].scene;
  }

  set currentScene(scene) {
    this.#devices[this.#currentDeviceName].scene = scene;
  }
}

module.exports = XToucher;
