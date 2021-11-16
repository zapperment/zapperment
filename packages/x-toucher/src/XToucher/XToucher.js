const debug = require("debug")("zapperment:x-toucher");
const { MidiInterface } = require("@zapperment/midi");
const { SYSEX_MANUFACTURER } = require("../constants");
const { markCurrentScene } = require("./methods");
const DeviceState = require("../DeviceState");

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
  #previousDeviceName;
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
        this.switchDevice(data.deviceName);
        if (!this.currentDevice) {
          debug(`Switched to new device: “${this.#currentDeviceName}”`);
          this.currentDevice = new DeviceState();
        } else {
          debug(`Switched to existing device: “${this.#currentDeviceName}”`);
        }
        debug(
          `Previous device: ${
            this.#previousDeviceName ? `“${this.#previousDeviceName}”` : "none"
          }`
        );
        if (this.previousDevice) {
          debug("Calling “switch” to set device data")
          this.currentDevice.switch(data, this.previousDevice);
          return;
        }
      }
      debug("Calling “update” to set device data")
      this.currentDevice.update(data);
    });
    debug("X-Toucher started");
  }

  get currentScene() {
    return this.currentDevice.scene;
  }

  set currentScene(scene) {
    this.currentDevice.scene = scene;
  }

  get currentDevice() {
    return this.#devices[this.#currentDeviceName];
  }

  set currentDevice(device) {
    this.#devices[this.#currentDeviceName] = device;
  }

  get previousDevice() {
    return this.#devices[this.#previousDeviceName];
  }

  set previousDevice(device) {
    this.#devices[this.#previousDeviceName] = device;
  }

  switchDevice(deviceName) {
    this.#previousDeviceName = this.#currentDeviceName;
    this.#currentDeviceName = deviceName;
  }

  toObject() {
    return {
      currentDeviceName: this.#currentDeviceName,
      previousDeviceName: this.#previousDeviceName,
      devices: Object.entries(this.#devices).reduce(
        (devices, [deviceName, device]) => ({
          ...devices,
          [deviceName]: device.toObject(),
        }),
        {}
      ),
    };
  }

  toString() {
    return JSON.stringify(this.toObject(), null, 2);
  }
}

module.exports = XToucher;
