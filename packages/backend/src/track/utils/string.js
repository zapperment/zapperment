module.exports = (path, valueNode) => {
  if (valueNode === null) {
    throw new Error(`Property at ${path} must be a string, received null`);
  }
  if (typeof valueNode !== "string") {
    throw new Error(
      `Property at ${path} must be a string, received ${typeof valueNode}`
    );
  }
  if (valueNode.length === 0) {
    throw new Error(`Length of property at ${path} must be at least 1`);
  }
};
