const reduceNested = require("./reduceNested");

module.exports = reduceNested(value => {
  if (Array.isArray(value)) {
    return value.length;
  }
  if (value === null) {
    return null;
  }
  return 1;
});
