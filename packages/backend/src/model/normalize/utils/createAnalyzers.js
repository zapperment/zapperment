const reduceNestedSum = require("./reduceNestedSum");
const reduceNestedCount = require("./reduceNestedCount");
const reduceNestedCountNull = require("./reduceNestedCountNull");

module.exports = (...args) => ({
  sum: reduceNestedSum(...args),
  count: reduceNestedCount(...args),
  countNull: reduceNestedCountNull(...args)
});
