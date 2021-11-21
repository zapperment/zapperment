function getButtonPushInfo(note) {
  switch (note) {
    case 8:
    case 32:
      return {
        buttonName: "button1",
        sysexControllerNumber: 0,
        buttonNumber: 1,
      };
    case 9:
    case 33:
      return {
        buttonName: "button2",
        sysexControllerNumber: 1,
        buttonNumber: 2,
      };
    case 10:
    case 34:
      return {
        buttonName: "button3",
        sysexControllerNumber: 2,
        buttonNumber: 3,
      };
    case 11:
    case 35:
      return {
        buttonName: "button4",
        sysexControllerNumber: 3,
        buttonNumber: 4,
      };
    case 12:
    case 36:
      return {
        buttonName: "button5",
        sysexControllerNumber: 4,
        buttonNumber: 5,
      };
    case 13:
    case 37:
      return {
        buttonName: "button6",
        sysexControllerNumber: 5,
        buttonNumber: 6,
      };
    case 14:
    case 38:
      return {
        buttonName: "button7",
        sysexControllerNumber: 6,
        buttonNumber: 7,
      };
    case 15:
    case 39:
      return {
        buttonName: "button8",
        sysexControllerNumber: 7,
        buttonNumber: 8,
      };
    case 16:
    case 40:
      return { buttonName: "leftButton", sysexControllerNumber: 8 };
    case 17:
    case 41:
      return { buttonName: "rightButton", sysexControllerNumber: 9 };
    case 18:
    case 42:
      return { buttonName: "rewindButton", sysexControllerNumber: 10 };
    case 19:
    case 43:
      return { buttonName: "fastFwdButton", sysexControllerNumber: 11 };
    case 20:
    case 44:
      return { buttonName: "loopButton", sysexControllerNumber: 12 };
    case 21:
    case 45:
      return { buttonName: "stopButton", sysexControllerNumber: 13 };
    case 22:
    case 46:
      return { buttonName: "playButton", sysexControllerNumber: 14 };
    case 23:
    case 47:
      return { buttonName: "recordButton", sysexControllerNumber: 15 };
    default:
      return null;
  }
}

module.exports = getButtonPushInfo;
