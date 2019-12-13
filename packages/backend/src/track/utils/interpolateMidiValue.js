module.exports = (value, min, max) =>
  Math.round(((max - min) * value) / 127 + min);
