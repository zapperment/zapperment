const {
  DEFAULT_SCENE,
  DEFAULT_VALUE_RUN_PATTERN_DEVICES,
  DEFAULT_VALUE_BYPASS_ALL_FX,
} = require("../constants");
const { getDeviceStateProperty } = require("./utils");

class DeviceState {
  #currentSceneIndex = 0;
  #scenes = new Array(8).fill(null).map(() => ({ ...DEFAULT_SCENE }));
  runPatternDevices = DEFAULT_VALUE_RUN_PATTERN_DEVICES;
  bypassAllFX = DEFAULT_VALUE_BYPASS_ALL_FX;

  switch(data, previousDevice) {
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
        (this[propertyName] = getDeviceStateProperty(
          propertyName,
          data,
          previousDevice
        ))
    );
    if (
      data.leftButton === undefined &&
      data.rightButton === undefined &&
      data.rewindButton === undefined
    ) {
      this.variantA = previousDevice.variantA;
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
      this.variantB = previousDevice.variantB;
    } else {
      this.setVariantBFromReasonData(
        data.fastFwdButton,
        data.loopButton,
        data.stopButton
      );
    }
    this.runPatternDevices =
      data.playButton === undefined
        ? previousDevice.runPatternDevices
        : data.playButton;
    this.bypassAllFX =
      data.recordButton === undefined
        ? previousDevice.bypassAllFX
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
    this.currentScene.variantA = values.findIndex((curr) => curr) + 1;
  }

  setVariantBFromReasonData(...values) {
    this.currentScene.variantB = values.findIndex((curr) => curr) + 1;
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
      currentSceneIndex: this.#currentSceneIndex,
      scenes: this.#scenes[0],
      runPatternDevices: this.runPatternDevices,
      bypassAllFX: this.bypassAllFX,
    };
  }

  toString() {
    return JSON.stringify(this.toObject(), null, 2);
  }
}

module.exports = DeviceState;
