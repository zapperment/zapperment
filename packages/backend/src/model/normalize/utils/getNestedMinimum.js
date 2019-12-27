const reduceNested = require("./reduceNested");

module.exports = reduceNested(
  (acc, curr) => Math.min(acc, curr),
  Number.MAX_SAFE_INTEGER
);
