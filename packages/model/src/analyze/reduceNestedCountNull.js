const reduceNested = require("./reduceNested");

module.exports = reduceNested(value => value === null ? 1 : null);
