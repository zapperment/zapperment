module.exports = (str, len) =>
  Array(Math.ceil(str.length / len))
    .fill()
    .map((_, i) => str.slice(i * len, i * len + len));

