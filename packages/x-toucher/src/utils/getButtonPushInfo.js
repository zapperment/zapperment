function getButtonPushInfo(note) {
  switch (note) {
    case 8:
    case 32:
      return {
        xTouchButtonName: "button1",
        combinatorButtonName: "button1",
        sysexControllerNumber: 0,
        buttonNumber: 1,
      };
    case 9:
    case 33:
      return {
        xTouchButtonName: "button2",
        combinatorButtonName: "button2",
        sysexControllerNumber: 1,
        buttonNumber: 2,
      };
    case 10:
    case 34:
      return {
        xTouchButtonName: "button3",
        combinatorButtonName: "button3",
        sysexControllerNumber: 2,
        buttonNumber: 3,
      };
    case 11:
    case 35:
      return {
        xTouchButtonName: "button4",
        combinatorButtonName: "button4",
        sysexControllerNumber: 3,
        buttonNumber: 4,
      };
    case 12:
    case 36:
      return {
        xTouchButtonName: "button5",
        combinatorButtonName: "button5",
        sysexControllerNumber: 4,
        buttonNumber: 5,
      };
    case 13:
    case 37:
      return {
        xTouchButtonName: "button6",
        combinatorButtonName: "button6",
        sysexControllerNumber: 5,
        buttonNumber: 6,
      };
    case 14:
    case 38:
      return {
        xTouchButtonName: "button7",
        combinatorButtonName: "button7",
        sysexControllerNumber: 6,
        buttonNumber: 7,
      };
    case 15:
    case 39:
      return {
        xTouchButtonName: "button8",
        combinatorButtonName: "button8",
        sysexControllerNumber: 7,
        buttonNumber: 8,
      };
    case 16:
    case 40:
      return {
        xTouchButtonName: "leftButton",
        combinatorButtonName: "variantA",
        variantValue: 1,
        sysexControllerNumber: 8,
        otherSysexControllerNumbers: [9, 10],
        buttonNumber: 9,
        otherButtonNumbers: [10,11]
      };
    case 17:
    case 41:
      return {
        xTouchButtonName: "rightButton",
        combinatorButtonName: "variantA",
        variantValue: 2,
        sysexControllerNumber: 9,
        otherSysexControllerNumbers: [8, 10],
        buttonNumber: 10,
        otherButtonNumbers: [9,11]
      };
    case 18:
    case 42:
      return {
        xTouchButtonName: "rewindButton",
        combinatorButtonName: "variantA",
        variantValue: 3,
        sysexControllerNumber: 10,
        otherSysexControllerNumbers: [8, 9],
        buttonNumber: 11,
        otherButtonNumbers: [9,10]
      };
    case 19:
    case 43:
      return {
        xTouchButtonName: "fastFwdButton",
        combinatorButtonName: "variantB",
        variantValue: 1,
        sysexControllerNumber: 11,
        otherSysexControllerNumbers: [12, 13],
        buttonNumber: 12,
        otherButtonNumbers: [13,14]
      };
    case 20:
    case 44:
      return {
        xTouchButtonName: "loopButton",
        combinatorButtonName: "variantB",
        variantValue: 2,
        sysexControllerNumber: 12,
        otherSysexControllerNumbers: [11, 13],
        buttonNumber: 13,
        otherButtonNumbers: [12,14]
      };
    case 21:
    case 45:
      return {
        xTouchButtonName: "stopButton",
        combinatorButtonName: "variantB",
        variantValue: 3,
        sysexControllerNumber: 13,
        otherSysexControllerNumbers: [11, 12],
        buttonNumber: 14,
        otherButtonNumbers: [12,13]
      };
    case 22:
    case 46:
      return {
        xTouchButtonName: "playButton",
        combinatorButtonName: "runPatternDevices",
        sysexControllerNumber: 14,
        buttonNumber: 15,
      };
    case 23:
    case 47:
      return {
        xTouchButtonName: "recordButton",
        combinatorButtonName: "bypassAllFx",
        sysexControllerNumber: 15,
        buttonNumber: 16,
      };
    default:
      return null;
  }
}

module.exports = getButtonPushInfo;
