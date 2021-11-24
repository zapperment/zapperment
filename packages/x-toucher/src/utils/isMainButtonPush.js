function isMainButtonPush(note) {
  return (note >= 8 && note <= 15) || (note >= 32 && note <= 39);
}

module.exports = isMainButtonPush;
