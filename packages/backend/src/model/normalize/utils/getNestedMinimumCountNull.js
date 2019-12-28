const reduceNestedCountNull = require("./reduceNestedCountNull");

module.exports = reduceNestedCountNull(
  (acc, curr) => Math.min(acc, curr),
  Number.MAX_SAFE_INTEGER
);
