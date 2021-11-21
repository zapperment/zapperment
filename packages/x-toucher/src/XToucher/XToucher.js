const debug = require("debug")("zapperment:x-toucher");
const debugReason = require("debug")("zapperment:x-toucher:reason");
const { MidiInterface } = require("@zapperment/midi");
const {
  SYSEX_MANUFACTURER,
  ROTARY_COARSE_INCREMENT,
  ROTARY_FINE_INCREMENT,
} = require("../constants");
const { markCurrentScene } = require("./methods");
const CombinatorState = require("../CombinatorState");
const { getLedNumber } = require("../utils");

function isRotaryKnobPush(note) {
  return note <= 7 || (note >= 24 && note <= 31);
}

function getSceneFromRotaryKnobPushNote(note) {
  return note <= 7 ? note + 1 : note - 23;
}

class XToucher {
  #xTouchInterface;
  #reasonInterface;
  #currentCombinatorName;
  #previousCombinatorName;
  #combinators = {};
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
    // this.#xTouchInterface.receiveMidiMessage((message) => {
    //   debug("X-Touch → Reason:", message);
    //   this.#reasonInterface.sendMidiMessage(message);
    // });

    // turn off all LEDs on all rotary knobs
    for (let i = 9; i <= 16; i++) {
      this.#xTouchInterface.sendControlChange(1, i, 0);
    }

    this.#xTouchInterface.receiveNoteOn(11, (note) => {
      if (!isRotaryKnobPush(note)) {
        return;
      }
      const sceneNumber = getSceneFromRotaryKnobPushNote(note);
      debug(
        `Scene ${sceneNumber} selected for Combinator “${
          this.#currentCombinatorName
        }”`
      );
      this.currentSceneNumber = sceneNumber;
      this.#markCurrentScene();
      this.#updateReason();
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

    rotaryReceiverConfigs.forEach(
      ({
        controllerNumber,
        rotaryNumber,
        controllerName,
        increment,
        sysexControllerNumber,
        xTouchLedControlNumber,
      }) => {
        this.#xTouchInterface.receiveControlChange(
          11,
          controllerNumber,
          (() => {
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
                case nextXTouchValue === 127 ||
                  nextXTouchValue > prevXTouchValue:
                  interactionType = TURN_CLOCKWISE;
                  break;
                default:
                  interactionType = TURN_COUNTERCLOCKWISE;
              }
              prevXTouchValue = nextXTouchValue;
              const prevCombinatorValue =
                this.currentCombinator[controllerName];

              // turn off all LEDs on the rotary knob
              this.#xTouchInterface.sendControlChange(
                1,
                xTouchLedControlNumber,
                0
              );

              // This FIRST_TIME condition is a bit ugly – when we receive the first
              // CC for a knob, we have to return early without doing anything, because
              // we have no way of knowing which direction the knob was twisted
              if (interactionType === FIRST_TIME) {
                return;
              }

              if (
                interactionType === TURN_CLOCKWISE &&
                prevCombinatorValue === 127
              ) {
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
                nextCombinatorValue = Math.min(
                  127,
                  prevCombinatorValue + increment
                );
                debug(`${controllerName} ↑ ${nextCombinatorValue}`);
              }
              if (interactionType === TURN_COUNTERCLOCKWISE) {
                nextCombinatorValue = Math.max(
                  0,
                  prevCombinatorValue - increment
                );
                debug(`${controllerName} ↓ ${nextCombinatorValue}`);
              }
              this.currentCombinator[controllerName] = nextCombinatorValue;
              this.#reasonInterface.sendSysEx(SYSEX_MANUFACTURER, [
                sysexControllerNumber,
                nextCombinatorValue,
              ]);
            };
          })()
        );
      }
    );

    // this.#reasonInterface.receiveMidiMessage((message) => {
    // debug("Reason → X-Touch:", message);
    // this.#xTouchInterface.sendMidiMessage(message);
    // });

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
      debug("Data received from Reason");
      debug(data);
      if (data.deviceName) {
        this.switchCombinator(data.deviceName);
        if (!this.currentCombinator) {
          debug(`Switched to new Combinator: “${this.#currentCombinatorName}”`);
          this.currentCombinator = new CombinatorState();
        } else {
          debug(
            `Switched to existing Combinator: “${this.#currentCombinatorName}”`
          );
        }
        debug(
          `Previous Combinator: ${
            this.#previousCombinatorName
              ? `“${this.#previousCombinatorName}”`
              : "none"
          }`
        );
        if (this.previousCombinator) {
          debug("Calling “switch” to set Combinator state");
          this.currentCombinator.switch(data, this.previousCombinator);
          this.#updateXTouchRotaryLeds();
          return;
        }
      }
      debug("Calling “update” to set Combinator state");
      this.currentCombinator.update(data);
      this.#updateXTouchRotaryLeds();
    });
    debug("X-Toucher started");
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
