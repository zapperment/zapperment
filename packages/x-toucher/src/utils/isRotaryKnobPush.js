function isRotaryKnobPush(note) {
  return note <= 7 || (note >= 24 && note <= 31);
}

module.exports = isRotaryKnobPush;
