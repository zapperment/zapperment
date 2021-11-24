function getLedNumber(value) {
  return Math.ceil((value / 127) * 13) || 1;
}

module.exports = getLedNumber;
