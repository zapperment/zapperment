const reduceNestedCountNull = require("./reduceNestedCountNull");

module.exports = reduceNestedCountNull((acc, curr) => Math.max(acc, curr));
