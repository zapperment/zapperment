const isNumber = require("./isNumber");

module.exports = (path, key, valueNode) => {
  if (valueNode === null) {
    throw new Error(`Property at ${path} must be a number, received null`);
  }
  if (!isNumber(valueNode)) {
    throw new Error(
      `Property at ${path} must be a number, received ${valueNode}`
    );
  }
};
