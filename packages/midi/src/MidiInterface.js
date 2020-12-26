const { openMidiOut, openMidiIn, splitSysEx } = require("./utils");
const {
  CONTROL_CHANGE,
  NOTE_ON,
  NOTE_OFF,
  SYSEX_START,
  SYSEX_END,
  START,
  STOP,
  CLOCK
} = require("./constants");
const { convertBytesToString } = require("@zapperment/shared");

const createKeyCreator = type => (bytes = []) =>
  convertBytesToString([type].concat(bytes));
const createSysExKey = createKeyCreator(SYSEX_START);
const stopKey = createKeyCreator(STOP)();
const startKey = createKeyCreator(START)();
const clockKey = createKeyCreator(CLOCK)();

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

  receiveStart() {
    this.#receivers.set(startKey);
  }

  dontReceiveStart() {
    this.#receivers.delete(startKey);
  }

  sendClock() {
    this.#midiOut.sendMessage([CLOCK]);
  }

  receiveClock() {
    this.#receivers.set(clockKey);
  }

  dontReceiveClock() {
    this.#receivers.delete(clockKey);
  }

  sendControlChange(channel, controller, value) {
    this.#midiOut.sendMessage([
      CONTROL_CHANGE + channel - 1,
      controller,
      value
    ]);
  }

  receiveControlChange(channel, controller, callback) {
    this.#receivers.set(
      { channel, controller, type: CONTROL_CHANGE },
      callback
    );
  }

  dontReceiveControlChange(channel, controller) {
    this.#receivers.delete({ channel, controller, type: CONTROL_CHANGE });
  }

  sendNoteOn(channel, note, velocity = 127) {
    this.#midiOut.sendMessage([NOTE_ON + channel - 1, note, velocity]);
  }

  receiveNoteOn(channel, note, callback) {
    this.#receivers.set({ channel, note, type: NOTE_ON }, callback);
  }

  dontReceiveNoteOn(channel, note) {
    this.#receivers.delete({ channel, note, type: NOTE_ON });
  }

  sendNoteOff(channel, note, velocity = 0) {
    this.#midiOut.sendMessage([NOTE_OFF + channel - 1, note, velocity]);
  }

  receiveNoteOff(channel, note, callback) {
    this.#receivers.set({ channel, note, type: NOTE_OFF }, callback);
  }

  dontReceiveNoteOff(channel, note) {
    this.#receivers.delete({ channel, note, type: NOTE_OFF });
  }

  sendSysEx(manufacturerId, data) {
    this.#midiOut.sendMessage([
      SYSEX_START,
      ...manufacturerId,
      ...data,
      SYSEX_END
    ]);
  }

  receiveSysEx(manufacturerId, callback) {
    console.log(
      "[PH_LOG] setting sys ex receiver",
      createSysExKey(manufacturerId)
    ); // PH_TODO
    this.#receivers.set(createSysExKey(manufacturerId), callback);
  }

  dontReceiveSysEx(manufacturerId, callback) {
    this.#receivers.delete({ type: SYSEX_START });
  }

  #fatalError = error => {
    console.error(`Fatal error in MIDI interface module: ${error.message}`);
    process.exit(1);
  };

  #handleMessage = (message, deltaTime) => {
    const status = message[0];
    let type = null;
    let channel = null;
    if (status < SYSEX_START) {
      type = (status >> 4) << 4;
      channel = (status & 0x0f) + 1;
    } else {
      type = status;
    }
    switch (type) {
      case NOTE_ON: {
        const [, note, velocity] = message;
        console.log(
          `note on, channel ${channel}, note ${note}, velocity ${velocity}`
        ); // PH_TODO
        break;
      }
      case NOTE_OFF: {
        const [, note] = message;
        console.log(`note off, channel ${channel}, note ${note}`); // PH_TODO
        break;
      }
      case CONTROL_CHANGE: {
        const [, controller, value] = message;
        console.log(
          `control change, channel ${channel}, controller ${controller}, value ${value}`
        ); // PH_TODO
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
        console.log("clock"); // PH_TODO
        break;
      }
      case STOP: {
        console.log("stop"); // PH_TODO
        break;
      }
      case START: {
        console.log("start"); // PH_TODO
        break;
      }
      default:
        console.log("unknown"); // PH_TODO
    }
  };
};
