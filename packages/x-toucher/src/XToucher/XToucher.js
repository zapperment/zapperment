const debug = require("debug")("zapperment:x-toucher");
const { MidiInterface } = require("@zapperment/midi");
const { SYSEX_MANUFACTURER } = require("../constants");
const { markCurrentScene } = require("./methods");
const CombinatorState = require("../CombinatorState");

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
    this.#xTouchInterface.receiveMidiMessage((message) => {
      // debug("X-Touch → Reason:", message);
      this.#reasonInterface.sendMidiMessage(message);
    });

    this.#xTouchInterface.receiveNoteOn(11, (note) => {
      if (!isRotaryKnobPush(note)) {
        return;
      }
      const scene = getSceneFromRotaryKnobPushNote(note);
      debug(`Scene ${scene} selected for Combinator “${this.#currentCombinatorName}”`);
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
        this.switchCombinator(data.deviceName);
        if (!this.currentCombinator) {
          debug(`Switched to new Combinator: “${this.#currentCombinatorName}”`);
          this.currentCombinator = new CombinatorState();
        } else {
          debug(`Switched to existing Combinator: “${this.#currentCombinatorName}”`);
        }
        debug(
          `Previous Combinator: ${
            this.#previousCombinatorName ? `“${this.#previousCombinatorName}”` : "none"
          }`
        );
        if (this.previousCombinator) {
          debug("Calling “switch” to set Combinator state")
          this.currentCombinator.switch(data, this.previousCombinator);
          return;
        }
      }
      debug("Calling “update” to set Combinator state")
      this.currentCombinator.update(data);
    });
    debug("X-Toucher started");
  }

  get currentScene() {
    return this.currentCombinator.scene;
  }

  set currentScene(scene) {
    this.currentCombinator.scene = scene;
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
