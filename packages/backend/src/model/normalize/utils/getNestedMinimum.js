const reduceNestedSum = require("./reduceNestedSum");

module.exports = reduceNestedSum(
  (acc, curr) => Math.min(acc, curr),
  Number.MAX_SAFE_INTEGER
);
