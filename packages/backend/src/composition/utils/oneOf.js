module.exports = (...options) => (path, key, valueNode, context) => {
  if (!options.includes(valueNode)) {
    throw new Error(
      `Invalid value at ${path}, received ${valueNode}, expected one of: ${options.join(
        ", "
      )}`
    );
  }
};
