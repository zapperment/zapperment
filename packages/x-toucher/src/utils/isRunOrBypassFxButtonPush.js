function isMainButtonPush(note) {
  return (note >= 22 && note <= 23) || (note >= 46 && note <= 47);
}

module.exports = isMainButtonPush;
