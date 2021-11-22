const debug = require("debug")("zapperment:x-toucher");
const debugReason = require("debug")("zapperment:x-toucher:reason");
const { MidiInterface } = require("@zapperment/midi");
const {
  SYSEX_MANUFACTURER,
  ROTARY_COARSE_INCREMENT,
  ROTARY_FINE_INCREMENT,
  FADER_STATUS_ABOVE,
  FADER_STATUS_IN_SYNC,
  FADER_STATUS_BELOW,
  FADER_STATUS_UNKNOWN,
} = require("../constants");
const CombinatorState = require("../CombinatorState");
const {
  getButtonPushInfo,
  getLedNumber,
  isRotaryKnobPush,
  isMainButtonPush,
  isRunOrBypassFxButtonPush,
  isVariantButtonPush,
  getSceneFromRotaryKnobPushNote,
} = require("../utils");

class XToucher {
  #xTouchInterface;
  #reasonInterface;
  #currentCombinatorName;
  #previousCombinatorName;
  #combinators = {};
  #faderStatus = FADER_STATUS_UNKNOWN;

  constructor() {
    this.#xTouchInterface = new MidiInterface({ midiPortName: "X-TOUCH MINI" });
    this.#reasonInterface = new MidiInterface({
      midiPortName: "Zapperment X-Toucher",
      isVirtual: true,
    });
    debug("X-Toucher created");
  }

  start() {
    // turn off all LEDs on all rotary knobs
    for (let i = 9; i <= 16; i++) {
      this.#xTouchInterface.sendControlChange(1, i, 0);
    }

    this.#xTouchInterface.receiveNoteOn(11, (note) => {
      switch (true) {
        case isRotaryKnobPush(note):
          this.#handleRotaryKnobPush(note);
          break;
        case isMainButtonPush(note):
        case isRunOrBypassFxButtonPush(note):
          this.#handleButtonPush(note);
          break;
        case isVariantButtonPush(note):
          this.#handleVariantButtonPush(note);
          break;
        default:
      }
    });

    this.#xTouchInterface.receiveNoteOff(11, (note) => {
      switch (true) {
        case isMainButtonPush(note):
        case isRunOrBypassFxButtonPush(note):
          this.#handleButtonNoteOff(note);
          break;
        case isVariantButtonPush(note):
          this.#handleVariantButtonNoteOff(note);
          break;
        default:
      }
    });

    const rotaryReceiverConfigs = [];

    for (let i = 1; i <= 8; i++) {
      rotaryReceiverConfigs.push({
        controllerNumber: i,
        rotaryNumber: i,
        controllerName: `rotary${i}`,
        increment: ROTARY_COARSE_INCREMENT,
        sysexControllerNumber: i + 15,
        xTouchLedControlNumber: i + 8,
      });
      rotaryReceiverConfigs.push({
        controllerNumber: i + 10,
        rotaryNumber: i,
        controllerName: `rotary${i}`,
        increment: ROTARY_FINE_INCREMENT,
        sysexControllerNumber: i + 15,
        xTouchLedControlNumber: i + 8,
      });
    }

    rotaryReceiverConfigs.forEach((rotaryReceiverConfig) => {
      this.#xTouchInterface.receiveControlChange(
        11,
        rotaryReceiverConfig.controllerNumber,
        this.#makeRotaryKnobTwistHandler(rotaryReceiverConfig)
      );
    });

    this.#xTouchInterface.receiveControlChange(
      11,
      9,
      this.#handleMasterFaderChange.bind(this)
    );

    this.#reasonInterface.receiveSysEx(SYSEX_MANUFACTURER, (message) => {
      const data = JSON.parse(String.fromCharCode(...message));
      if (data.debugMessage) {
        debugReason(data.debugMessage);
        if (Object.values(data).length === 1) {
          return;
        } else {
          delete data.debugMessage;
        }
      }

      if (data.deviceName) {
        this.#faderStatus = FADER_STATUS_UNKNOWN;
        this.switchCombinator(data.deviceName);
        if (!this.currentCombinator) {
          this.currentCombinator = new CombinatorState();
        }
        if (this.previousCombinator) {
          this.currentCombinator.switch(data, this.previousCombinator);
          this.#updateXTouchRotaryLeds();
          this.#updateXTouchButtonLeds();
          return;
        }
      }

      this.#switchOfCombinatorButtonsOfInactiveVariant(data)
      this.currentCombinator.update(data);
      this.#updateXTouchRotaryLeds();
      this.#updateXTouchButtonLeds();
    });
    debug("X-Toucher started");
  }

  #switchOfCombinatorButtonsOfInactiveVariant(data){
    [
      {
        name: "leftButton",
        otherSysExControllerNumbers: [9, 10],
      },
      {
        name: "rightButton",
        otherSysExControllerNumbers: [8, 10],
      },
      {
        name: "rewindButton",
        otherSysExControllerNumbers: [8, 9],
      },
      {
        name: "fastFwdButton",
        otherSysExControllerNumbers: [12, 13],
      },
      {
        name: "loopButton",
        otherSysExControllerNumbers: [11, 13],
      },
      {
        name: "stopButton",
        otherSysExControllerNumbers: [11, 12],
      },
    ].forEach(({ name, otherSysExControllerNumbers }) => {
      if (data[name]) {
        otherSysExControllerNumbers.forEach((otherSysExControllerNumber) =>
          this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
            otherSysExControllerNumber,
            0,
          ])
        );
      }
    });
  }

  #handleMasterFaderChange(nextValue) {
    const prevValue = this.currentCombinator.masterFader;
    switch (this.#faderStatus) {
      case FADER_STATUS_IN_SYNC:
        this.currentCombinator.masterFader = nextValue;
        this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [24, nextValue]);
        return;
      case FADER_STATUS_UNKNOWN:
        switch (true) {
          case nextValue > prevValue:
            this.#faderStatus = FADER_STATUS_ABOVE;
            break;
          case nextValue < prevValue:
            this.#faderStatus = FADER_STATUS_BELOW;
            break;
          default:
            this.#faderStatus = FADER_STATUS_IN_SYNC;
        }
        return;
      case FADER_STATUS_ABOVE:
        if (nextValue > prevValue) {
          return;
        }
        break;
      case FADER_STATUS_BELOW:
        if (nextValue < prevValue) {
          return;
        }
        break;
      default:
    }
    this.#faderStatus = FADER_STATUS_IN_SYNC;
    this.currentCombinator.masterFader = nextValue;
    this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [24, nextValue]);
  }

  #handleRotaryKnobPush(note) {
    this.currentSceneNumber = getSceneFromRotaryKnobPushNote(note);
    this.#faderStatus = FADER_STATUS_UNKNOWN;
    this.#updateReason();
  }

  #handleButtonPush(note) {
    const { combinatorButtonName, sysexControllerNumber } =
      getButtonPushInfo(note);
    const nextValue = !this.currentCombinator[combinatorButtonName];
    this.currentCombinator[combinatorButtonName] = nextValue;
    this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
      sysexControllerNumber,
      nextValue ? 127 : 0,
    ]);
  }

  #handleButtonNoteOff(note) {
    const { combinatorButtonName, buttonNumber } = getButtonPushInfo(note);
    this.#updateXTouchButtonLed(
      buttonNumber,
      this.currentCombinator[combinatorButtonName]
    );
  }

  #handleVariantButtonPush(note) {
    const {
      combinatorButtonName,
      sysexControllerNumber,
      otherSysexControllerNumbers,
      variantValue: nextValue,
    } = getButtonPushInfo(note);
    this.currentCombinator[combinatorButtonName] = nextValue;
    this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
      sysexControllerNumber,
      127,
    ]);
    otherSysexControllerNumbers.forEach((otherSysexControllerNumber) =>
      this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
        otherSysexControllerNumber,
        0,
      ])
    );
  }

  #handleVariantButtonNoteOff(note) {
    const {
      combinatorButtonName,
      variantValue,
      buttonNumber,
    } = getButtonPushInfo(note);

    this.#updateXTouchButtonLed(
      buttonNumber,
      this.currentCombinator[combinatorButtonName] === variantValue
    );
  }

  #makeRotaryKnobTwistHandler({
    rotaryNumber,
    controllerName,
    increment,
    sysexControllerNumber,
    xTouchLedControlNumber,
  }) {
    let prevXTouchValue = null;
    const FIRST_TIME = 0;
    const TURN_CLOCKWISE = 1;
    const TURN_COUNTERCLOCKWISE = 2;

    // We are not simply passing the CC values coming from the X-Touch rotary
    // encoder knobs through to Reason, because we want precise control over
    // the knob behavior. We're only interested in two things: which direction
    // a know was twisted (clockwise / counterclockwise) and which encoder mode
    // we are using (fine or coarse), selected through the X-Touch's layer buttons
    return (nextXTouchValue) => {
      let interactionType;
      switch (true) {
        case prevXTouchValue === null:
          interactionType = FIRST_TIME;
          break;
        case nextXTouchValue === 127 || nextXTouchValue > prevXTouchValue:
          interactionType = TURN_CLOCKWISE;
          break;
        default:
          interactionType = TURN_COUNTERCLOCKWISE;
      }
      prevXTouchValue = nextXTouchValue;
      const prevCombinatorValue = this.currentCombinator[controllerName];

      // turn off all LEDs on the rotary knob
      this.#xTouchInterface.sendControlChange(1, xTouchLedControlNumber, 0);

      // This FIRST_TIME condition is a bit ugly – when we receive the first
      // CC for a knob, we have to return early without doing anything, because
      // we have no way of knowing which direction the knob was twisted
      if (interactionType === FIRST_TIME) {
        return;
      }

      if (interactionType === TURN_CLOCKWISE && prevCombinatorValue === 127) {
        this.#updateXTouchRotaryLed(rotaryNumber, 127);
        return;
      }

      if (
        interactionType === TURN_COUNTERCLOCKWISE &&
        prevCombinatorValue === 0
      ) {
        this.#updateXTouchRotaryLed(rotaryNumber, 0);
        return;
      }

      let nextCombinatorValue;

      if (interactionType === TURN_CLOCKWISE) {
        nextCombinatorValue = Math.min(127, prevCombinatorValue + increment);
      }

      if (interactionType === TURN_COUNTERCLOCKWISE) {
        nextCombinatorValue = Math.max(0, prevCombinatorValue - increment);
      }
      this.currentCombinator[controllerName] = nextCombinatorValue;
      this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
        sysexControllerNumber,
        nextCombinatorValue,
      ]);
    };
  }

  #updateXTouchRotaryLeds() {
    for (let rotaryNumber = 1; rotaryNumber <= 8; rotaryNumber++) {
      const rotaryName = `rotary${rotaryNumber}`;
      const value = this.currentCombinator[rotaryName];
      this.#updateXTouchRotaryLed(rotaryNumber, value);
    }
  }

  #updateXTouchRotaryLed(rotaryNumber, value) {
    const ledNumber = getLedNumber(value);
    const ledValue =
      rotaryNumber !== this.currentSceneNumber ? ledNumber : ledNumber + 13;
    this.#xTouchInterface.sendControlChange(1, rotaryNumber + 8, ledValue);
  }

  #updateXTouchButtonLeds() {
    for (let buttonNumber = 1; buttonNumber <= 8; buttonNumber++) {
      const buttonName = `button${buttonNumber}`;
      const value = this.currentCombinator[buttonName];
      this.#updateXTouchButtonLed(buttonNumber, value);
    }
    this.#updateXTouchButtonLed(9, this.currentCombinator.variantA === 1);
    this.#updateXTouchButtonLed(10, this.currentCombinator.variantA === 2);
    this.#updateXTouchButtonLed(11, this.currentCombinator.variantA === 3);
    this.#updateXTouchButtonLed(12, this.currentCombinator.variantB === 1);
    this.#updateXTouchButtonLed(13, this.currentCombinator.variantB === 2);
    this.#updateXTouchButtonLed(14, this.currentCombinator.variantB === 3);
    this.#updateXTouchButtonLed(15, this.currentCombinator.runPatternDevices);
    this.#updateXTouchButtonLed(16, this.currentCombinator.bypassAllFX);
  }

  #updateXTouchButtonLed(buttonNumber, value) {
    const note = buttonNumber - 1;
    if (value) {
      this.#xTouchInterface.sendNoteOn(1, note, 1);
    } else {
      this.#xTouchInterface.sendNoteOff(1, note);
    }
  }

  /**
   * Sends the current scene of the current Combinator over to Reason using a
   * series of MIDI system exclusive message.
   */
  #updateReason() {
    this.currentCombinator
      .toSysExData()
      .forEach((value, index) =>
        this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [index, value])
      );
  }

  get currentSceneNumber() {
    return this.currentCombinator.currentSceneNumber;
  }

  set currentSceneNumber(sceneNumber) {
    this.currentCombinator.currentSceneNumber = sceneNumber;
  }

  get currentCombinator() {
    return this.#combinators[this.#currentCombinatorName];
  }

  set currentCombinator(combinatorState) {
    this.#combinators[this.#currentCombinatorName] = combinatorState;
  }

  get previousCombinator() {
    return this.#combinators[this.#previousCombinatorName];
  }

  set previousCombinator(combinatorState) {
    this.#combinators[this.#previousCombinatorName] = combinatorState;
  }

  switchCombinator(combinatorName) {
    this.#previousCombinatorName = this.#currentCombinatorName;
    this.#currentCombinatorName = combinatorName;
  }

  toObject() {
    return {
      currentCombinatorName: this.#currentCombinatorName,
      previousCombinatorName: this.#previousCombinatorName,
      combinators: Object.entries(this.#combinators).reduce(
        (combinators, [combinatorName, combinatorState]) => ({
          ...combinators,
          [combinatorName]: combinatorState.toObject(),
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
