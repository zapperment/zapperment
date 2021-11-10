const debug = require("debug")("zapperment:x-toucher");
const { MidiInterface } = require("@zapperment/midi");
const { isRadioButton } = require("./utils");

const SYSEX_DEVICE_NAME = 0;
const SYSEX_DEBUG_MESSAGE = 2;
const SYSEX_MANUFACTURER = "000066";

const xTouchInterface = new MidiInterface({ midiPortName: "X-TOUCH MINI" });
const reasonInterface = new MidiInterface({
  midiPortName: "Zapperment X-Toucher",
  isVirtual: true,
});

let lastRadioButtonXTouch = null;
let lastRadioButtonZapperment = null;

xTouchInterface.receiveMidiMessage((message) => {
  debug("X-Touch → Reason:", message);
  // if (isRadioButton(message)) {
  //   const nextRadioButton = message[1];
  //   debug("➡️ it's a radio button", nextRadioButton);
  //   if (lastRadioButtonXTouch) {
  //     debug("➡️ last radio button", lastRadioButtonXTouch);
  //     xTouchInterface.sendBeep(1, lastRadioButtonXTouch);
  //   }
  //   lastRadioButtonXTouch = nextRadioButton;
  // }
  reasonInterface.sendMidiMessage(message);
});

reasonInterface.receiveMidiMessage((message) => {
  debug("Reason → X-Touch:", message);
  // if (isRadioButton(message)) {
  //   const nextRadioButton = message[1];
  //   debug("⬅️ it's a radio button", nextRadioButton);
  //   if (lastRadioButtonZapperment) {
  //     debug("⬅️ last radio button", lastRadioButtonZapperment);
  //     reasonInterface.sendBeep(1, lastRadioButtonZapperment);
  //   }
  //   lastRadioButtonZapperment = nextRadioButton;
  // }
  xTouchInterface.sendMidiMessage(message);
});

reasonInterface.receiveSysEx(SYSEX_MANUFACTURER, (message) => {
  const [command, ...data] = message;
  switch (command) {
    case SYSEX_DEVICE_NAME:
      debug(`Received device name: “${String.fromCharCode(...data)}”`);
      break;
    case SYSEX_DEBUG_MESSAGE:
      debug(`Received debug message: “${String.fromCharCode(...data)}”`);
      break;
    default:
  }
});

function run() {
  setImmediate(run);
}
setTimeout(run, 100);
