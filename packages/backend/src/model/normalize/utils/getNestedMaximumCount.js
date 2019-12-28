const reduceNestedCount = require("./reduceNestedCount");

module.exports = reduceNestedCount((acc, curr) => Math.max(acc, curr));
