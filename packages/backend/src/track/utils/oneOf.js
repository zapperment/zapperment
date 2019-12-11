module.exports = (...options) => (path, key, valueNode) => {
  if (!options.includes(valueNode)) {
    throw new Error(
      `Invalid value at ${path}, received ${valueNode}, expected one of: ${options.join(
        ", "
      )}`
    );
  }
};
