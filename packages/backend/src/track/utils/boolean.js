module.exports = (path, valueNode) => {
  if (typeof valueNode !== "boolean") {
    throw new Error(
      `Property at ${path} must be a boolean value, received ${valueNode}`
    );
  }
};
