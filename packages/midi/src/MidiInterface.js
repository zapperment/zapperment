const debug = require("debug")("zapperment:midi:MidiInterface");
const { openMidiOut, openMidiIn, splitSysEx } = require("./utils");
const {
  CONTROL_CHANGE,
  NOTE_ON,
  NOTE_OFF,
  SYSEX_START,
  SYSEX_END,
  START,
  STOP,
  CLOCK,
} = require("./constants");
const { convertBytesToString } = require("@zapperment/shared");

const createKeyCreator =
  (type) =>
  (bytes = []) =>
    convertBytesToString([type].concat(bytes));
const stopKey = createKeyCreator(STOP)();
const startKey = createKeyCreator(START)();
const clockKey = createKeyCreator(CLOCK)();
const [
  createSysExKey,
  createControlChangeKey,
  createNoteOnKey,
  createNoteOffKey,
] = [SYSEX_START, CONTROL_CHANGE, NOTE_ON, NOTE_OFF].map(createKeyCreator);

module.exports = class {
  #midiOut = null;
  #midiIn = null;
  #receivers = new Map();

  constructor({ midiPortName }) {
    try {
      this.#midiOut = openMidiOut(midiPortName);
      this.#midiIn = openMidiIn(midiPortName);
    } catch (error) {
      this.#fatalError(error);
    }
    // Sysex, timing, and active sensing messages are ignored
    // by default. To enable these message types, pass false for
    // the appropriate type in the function below.
    // Order: (Sysex, Timing, Active Sensing)
    // For example if you want to receive only MIDI Clock beats
    // you should use
    // input.ignoreTypes(true, false, true)
    this.#midiIn.ignoreTypes(false, false, true);
    // Configure a callback.
    this.#midiIn.on("message", (deltaTime, message) =>
      this.#handleMessage(message, deltaTime)
    );
  }

  sendStop() {
    this.#midiOut.sendMessage([STOP]);
  }

  receiveStop(callback) {
    this.#receivers.set(stopKey, callback);
  }

  dontReceiveStop() {
    this.#receivers.delete(stopKey);
  }

  sendStart() {
    this.#midiOut.sendMessage([START]);
  }

  receiveStart(callback) {
    this.#receivers.set(startKey, callback);
  }

  dontReceiveStart() {
    this.#receivers.delete(startKey);
  }

  sendClock() {
    this.#midiOut.sendMessage([CLOCK]);
  }

  receiveClock(callback) {
    this.#receivers.set(clockKey, callback);
  }

  dontReceiveClock() {
    this.#receivers.delete(clockKey);
  }

  sendControlChange(channel, controller, value) {
    this.#midiOut.sendMessage([
      CONTROL_CHANGE + channel - 1,
      controller,
      value,
    ]);
  }

  receiveControlChange(channel, controller, callback) {
    this.#receivers.set(
      createControlChangeKey([channel, controller]),
      callback
    );
  }

  dontReceiveControlChange(channel, controller) {
    this.#receivers.delete(createControlChangeKey([channel, controller]));
  }

  sendNoteOn(channel, note, velocity = 127) {
    this.#midiOut.sendMessage([NOTE_ON + channel - 1, note, velocity]);
  }

  receiveNoteOn(channel, callback) {
    this.#receivers.set(createNoteOnKey([channel]), callback);
  }

  dontReceiveNoteOn(channel) {
    this.#receivers.delete(createNoteOnKey([channel]));
  }

  sendNoteOff(channel, note, velocity = 0) {
    this.#midiOut.sendMessage([NOTE_OFF + channel - 1, note, velocity]);
  }

  receiveNoteOff(channel, callback) {
    this.#receivers.set(createNoteOffKey([channel]), callback);
  }

  dontReceiveNoteOff(channel) {
    this.#receivers.delete(createNoteOffKey([channel]));
  }

  sendSysEx(manufacturerId, data) {
    this.#midiOut.sendMessage([
      SYSEX_START,
      ...manufacturerId,
      ...data,
      SYSEX_END,
    ]);
  }

  receiveSysEx(manufacturerId, callback) {
    debug("setting sys ex receiver", createSysExKey(manufacturerId));
    this.#receivers.set(createSysExKey(manufacturerId), callback);
  }

  dontReceiveSysEx(manufacturerId) {
    this.#receivers.delete(createSysExKey(manufacturerId));
  }

  #fatalError = (error) => {
    console.error(`Fatal error in MIDI interface module: ${error.message}`);
    process.exit(1);
  };

  #handleMessage = (message, deltaTime) => {
    const status = message[0];
    let type;
    let channel = null;
    if (status < SYSEX_START) {
      type = (status >> 4) << 4;
      channel = (status & 0x0f) + 1;
    } else {
      type = status;
    }
    // noinspection FallThroughInSwitchStatementJS
    switch (type) {
      case NOTE_ON: {
        const [, note, velocity] = message;
        if (velocity > 0) {
          debug(
            `note on, channel ${channel}, note ${note}, velocity ${velocity}`
          );
          const key = createNoteOnKey([channel]);
          const receiver = this.#receivers.get(key);
          if (receiver) {
            receiver(note, velocity, deltaTime);
          }
          break;
        }
      }
      case NOTE_OFF: {
        const [, note] = message;
        debug(`note off, channel ${channel}, note ${note}`);
        const key = createNoteOffKey([channel]);
        const receiver = this.#receivers.get(key);
        if (receiver) {
          receiver(note, deltaTime);
        }
        break;
      }
      case CONTROL_CHANGE: {
        const [, controller, value] = message;
        debug(
          `control change, channel ${channel}, controller ${controller}, value ${value}`
        );
        const key = createControlChangeKey([channel, controller]);
        const receiver = this.#receivers.get(key);
        if (receiver) {
          receiver(value, deltaTime);
        }
        break;
      }
      case SYSEX_START: {
        const { manufacturerId, data } = splitSysEx(message);
        const receiver = this.#receivers.get(createSysExKey(manufacturerId));
        if (receiver) {
          receiver(data, deltaTime);
        }
        break;
      }
      case CLOCK: {
        debug("clock");
        break;
      }
      case STOP: {
        debug("stop");
        break;
      }
      case START: {
        debug("start");
        break;
      }
      default:
        debug("unknown type", type);
    }
  };
};
