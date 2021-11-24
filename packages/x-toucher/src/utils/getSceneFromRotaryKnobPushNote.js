function getSceneFromRotaryKnobPushNote(note) {
  return note <= 7 ? note + 1 : note - 23;
}

module.exports = getSceneFromRotaryKnobPushNote;
