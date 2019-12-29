const reduceNestedSum = require("./reduceNestedSum");
const reduceNestedCount = require("./reduceNestedCount");
const reduceNestedCountNull = require("./reduceNestedCountNull");

module.exports = ({ reducer, initialValue, defaultValue }) => ({
  value: reduceNestedSum({ reducer, initialValue, defaultValue, sumUp: false }),
  total: reduceNestedSum({ reducer, initialValue, defaultValue }),
  count: reduceNestedCount({ reducer, initialValue, defaultValue }),
  countNull: reduceNestedCountNull({ reducer, initialValue, defaultValue })
});
