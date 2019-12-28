const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers((acc, curr, i, arr) => {
  if (i < arr.length - 1) {
    return acc + curr;
  }
  const avg = (acc + curr) / arr.length;
  return arr.reduce(
    (acc2, curr2, i2) =>
      i2 < arr.length - 1
        ? acc2 + Math.pow(curr2 - avg, 2)
        : (acc2 + Math.pow(curr2 - avg, 2)) / arr.length,
    0
  );
});
