const reduceNestedCount = require("./reduceNestedCount");

module.exports = reduceNestedCount(
  (acc, curr) => Math.min(acc, curr),
  Number.MAX_SAFE_INTEGER
);
