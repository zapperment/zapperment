const reduceNestedSum = require("./reduceNestedSum");

module.exports = reduceNestedSum(
  (acc, curr, i, arr) => {
    if (i < arr.length - 1) {
      return {
        min: Math.min(acc.min, curr),
        max: Math.max(acc.max, curr)
      };
    }
    return Math.max(acc.max, curr) - Math.min(acc.min, curr);
  },
  {
    min: Number.MAX_SAFE_INTEGER,
    max: 0
  }
);
