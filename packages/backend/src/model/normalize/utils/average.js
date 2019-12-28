const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers((acc, curr, i, arr) =>
  i < arr.length - 1 ? acc + curr : (acc + curr) / arr.length
);
