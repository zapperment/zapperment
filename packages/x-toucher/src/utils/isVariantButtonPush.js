function isVariantButtonPush(note) {
  return (note >= 16 && note <= 21) || (note >= 40 && note <= 45);
}

module.exports = isVariantButtonPush;
