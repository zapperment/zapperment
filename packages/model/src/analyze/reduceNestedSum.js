const reduceNested = require("./reduceNested");
const { isNumber } = require("@zapperment/shared");

module.exports = reduceNested(value => {
  if (isNumber(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    const values = value.filter(v => typeof v === "number");
    if (values.length === 0) {
      return null;
    }
    return values.reduce((acc, curr) => acc + curr, 0);
  }
  return null;
});
