const reduceNested = require("./reduceNested");

module.exports = reduceNested((acc, curr, i, arr) =>
  i < arr.length - 1 ? acc + curr : (acc + curr) / arr.length
);
