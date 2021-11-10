const debug = require("debug")("zapperment:x-toucher:isRadioButton");
const isNoteOn = require("./isNoteOn");

const radioButtonNotes = [87, 88, 91, 92];

module.exports = (message) => {
  if (!isNoteOn(message)) {
    return false;
  }
  const [, note] = message;
  if (!radioButtonNotes.includes(note)) {
    return false;
  }
  debug("received radio button", note);
  return true;
};
