module.exports = (path, valueNode) => {
  if (!Array.isArray(valueNode)) {
    throw new Error(`Expected an array at ${path}`);
  }
  if (valueNode.length === 0) {
    throw new Error(`Array at ${path} cannot be empty`);
  }
};
