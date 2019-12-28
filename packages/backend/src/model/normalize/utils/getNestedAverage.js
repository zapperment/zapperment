const reduceNestedSum = require("./reduceNestedSum");

module.exports = reduceNestedSum((acc, curr, i, arr) =>
  i < arr.length - 1 ? acc + curr : (acc + curr) / arr.length
);
