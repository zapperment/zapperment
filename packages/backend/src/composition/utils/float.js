const number = require("./number");

module.exports = (min, max) => (path, key, valueNode, context) => {
  number(path, key, valueNode, context);
  if (valueNode < min || valueNode > max) {
    throw new Error(
      `Property at ${path} must be in range ${min}-${max}, received ${valueNode}`
    );
  }
};
