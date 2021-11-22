const {
  DEFAULT_SCENE,
  DEFAULT_VALUE_RUN_PATTERN_DEVICES,
  DEFAULT_VALUE_BYPASS_ALL_FX,
} = require("../constants");
const {
  getCombinatorStateProperty,
  getVariantFromReasonData,
} = require("./utils");

class CombinatorState {
  #currentSceneIndex = 0;
  #scenes = new Array(8).fill(null).map(() => ({ ...DEFAULT_SCENE }));
  runPatternDevices = DEFAULT_VALUE_RUN_PATTERN_DEVICES;
  bypassAllFX = DEFAULT_VALUE_BYPASS_ALL_FX;

  switch(data, previousCombinator) {
    [
      "button1",
      "button2",
      "button3",
      "button4",
      "button5",
      "button6",
      "button7",
      "button8",
      "rotary1",
      "rotary2",
      "rotary3",
      "rotary4",
      "rotary5",
      "rotary6",
      "rotary7",
      "rotary8",
      "masterFader",
    ].forEach(
      (propertyName) =>
        (this[propertyName] = getCombinatorStateProperty(
          propertyName,
          data,
          previousCombinator
        ))
    );
    if (
      data.leftButton === undefined &&
      data.rightButton === undefined &&
      data.rewindButton === undefined
    ) {
      this.variantA = previousCombinator.variantA;
    } else {
      this.setVariantAFromReasonData(
        data.leftButton,
        data.rightButton,
        data.rewindButton
      );
    }
    if (
      data.fastFwdButton === undefined &&
      data.loopButton === undefined &&
      data.stopButton === undefined
    ) {
      this.variantB = previousCombinator.variantB;
    } else {
      this.setVariantBFromReasonData(
        data.fastFwdButton,
        data.loopButton,
        data.stopButton
      );
    }
    this.runPatternDevices =
      data.playButton === undefined
        ? previousCombinator.runPatternDevices
        : data.playButton;
    this.bypassAllFX =
      data.recordButton === undefined
        ? previousCombinator.bypassAllFX
        : data.recordButton;
  }

  update(data) {
    [
      "button1",
      "button2",
      "button3",
      "button4",
      "button5",
      "button6",
      "button7",
      "button8",
      "rotary1",
      "rotary2",
      "rotary3",
      "rotary4",
      "rotary5",
      "rotary6",
      "rotary7",
      "rotary8",
      "masterFader",
    ].forEach((propertyName) => {
      const value = data[propertyName];
      if (value !== undefined) {
        this[propertyName] = value;
      }
    });
    if (
      data.leftButton !== undefined ||
      data.rightButton !== undefined ||
      data.rewindButton !== undefined
    ) {
      this.setVariantAFromReasonData(
        data.leftButton,
        data.rightButton,
        data.rewindButton
      );
    }
    if (
      data.fastFwdButton !== undefined ||
      data.loopButton !== undefined ||
      data.stopButton !== undefined
    ) {
      this.setVariantBFromReasonData(
        data.fastFwdButton,
        data.loopButton,
        data.stopButton
      );
    }
    if (data.playButton !== undefined) {
      this.runPatternDevices = data.playButton;
    }
    if (data.recordButton !== undefined) {
      this.bypassAllFX = data.recordButton;
    }
  }

  get currentScene() {
    return this.#scenes[this.#currentSceneIndex];
  }

  set rotary1(value) {
    this.currentScene.rotary1 = value;
  }

  set rotary2(value) {
    this.currentScene.rotary2 = value;
  }

  set rotary3(value) {
    this.currentScene.rotary3 = value;
  }

  set rotary4(value) {
    this.currentScene.rotary4 = value;
  }

  set rotary5(value) {
    this.currentScene.rotary5 = value;
  }

  set rotary6(value) {
    this.currentScene.rotary6 = value;
  }

  set rotary7(value) {
    this.currentScene.rotary7 = value;
  }

  set rotary8(value) {
    this.currentScene.rotary8 = value;
  }

  set button1(value) {
    this.currentScene.button1 = value;
  }

  set button2(value) {
    this.currentScene.button2 = value;
  }

  set button3(value) {
    this.currentScene.button3 = value;
  }

  set button4(value) {
    this.currentScene.button4 = value;
  }

  set button5(value) {
    this.currentScene.button5 = value;
  }

  set button6(value) {
    this.currentScene.button6 = value;
  }

  set button7(value) {
    this.currentScene.button7 = value;
  }

  set button8(value) {
    this.currentScene.button8 = value;
  }

  set variantA(value) {
    this.currentScene.variantA = value;
  }

  set variantB(value) {
    this.currentScene.variantB = value;
  }

  setVariantAFromReasonData(...values) {
    this.currentScene.variantA = getVariantFromReasonData(
      this.currentScene.variantA,
      ...values
    );
  }

  setVariantBFromReasonData(...values) {
    this.currentScene.variantB = getVariantFromReasonData(
      this.currentScene.variantB,
      ...values
    );
  }

  set masterFader(value) {
    this.currentScene.masterFader = value;
  }

  get rotary1() {
    return this.currentScene.rotary1;
  }

  get rotary2() {
    return this.currentScene.rotary2;
  }

  get rotary3() {
    return this.currentScene.rotary3;
  }

  get rotary4() {
    return this.currentScene.rotary4;
  }

  get rotary5() {
    return this.currentScene.rotary5;
  }

  get rotary6() {
    return this.currentScene.rotary6;
  }

  get rotary7() {
    return this.currentScene.rotary7;
  }

  get rotary8() {
    return this.currentScene.rotary8;
  }

  get button1() {
    return this.currentScene.button1;
  }

  get button2() {
    return this.currentScene.button2;
  }

  get button3() {
    return this.currentScene.button3;
  }

  get button4() {
    return this.currentScene.button4;
  }

  get button5() {
    return this.currentScene.button5;
  }

  get button6() {
    return this.currentScene.button6;
  }

  get button7() {
    return this.currentScene.button7;
  }

  get button8() {
    return this.currentScene.button8;
  }

  get variantA() {
    return this.currentScene.variantA;
  }

  get variantB() {
    return this.currentScene.variantB;
  }

  get masterFader() {
    return this.currentScene.masterFader;
  }

  toObject() {
    return {
      currentSceneNumber: this.currentSceneNumber,
      scenes: this.#scenes,
      runPatternDevices: this.runPatternDevices,
      bypassAllFX: this.bypassAllFX,
    };
  }

  toString() {
    return JSON.stringify(this.toObject(), null, 2);
  }

  // Reason's remote API won't allow us to send arbitrary length
  // sysex data, so we have to send a series of sysex messages, one
  // for each control
  toSysExData() {
    return [
      this.button1 ? 127 : 0,
      this.button2 ? 127 : 0,
      this.button3 ? 127 : 0,
      this.button4 ? 127 : 0,
      this.button5 ? 127 : 0,
      this.button6 ? 127 : 0,
      this.button7 ? 127 : 0,
      this.button8 ? 127 : 0,
      // leftButton
      this.variantA === 1 ? 127 : 0,
      // rightButton
      this.variantA === 2 ? 127 : 0,
      // rewindButton
      this.variantA === 3 ? 127 : 0,
      // fastFwdButton
      this.variantB === 1 ? 127 : 0,
      // loopButton
      this.variantB === 2 ? 127 : 0,
      // stopButton
      this.variantB === 3 ? 127 : 0,
      // playButton
      this.runPatternDevices ? 127 : 0,
      // recordButton
      this.bypassAllFX ? 127 : 0,
      this.rotary1,
      this.rotary2,
      this.rotary3,
      this.rotary5,
      this.rotary5,
      this.rotary6,
      this.rotary7,
      this.rotary8,
      this.masterFader,
    ];
  }

  set currentSceneNumber(sceneNumber) {
    this.#currentSceneIndex = sceneNumber - 1;
  }

  get currentSceneNumber() {
    return this.#currentSceneIndex + 1;
  }
}

module.exports = CombinatorState;
