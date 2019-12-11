module.exports = (path, valueNode) => {
  if (valueNode === null) {
    throw new Error(`Property at ${path} must be a number, received null`);
  }
  if (
    isNaN(valueNode) ||
    !isFinite(valueNode) ||
    typeof valueNode !== "number"
  ) {
    throw new Error(
      `Property at ${path} must be a number, received ${valueNode}`
    );
  }
};
