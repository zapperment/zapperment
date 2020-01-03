const { isNumber } = require("../../utils");

module.exports = (path, key, valueNode, errorInfo) => {
  if (valueNode === null) {
    throw new Error(`Property at ${path} must be a number, received null`);
  }
  if (!isNumber(valueNode)) {
    throw new Error(
      `Property at ${path} must be a number, received ${valueNode}`
    );
  }
};
