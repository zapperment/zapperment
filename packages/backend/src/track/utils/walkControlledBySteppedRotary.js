const walk = require("./walk");

module.exports = (definitionNode, path, key, valueNode) => {
  if (Object.keys(valueNode[key]).length === 0) {
    throw new Error(
      `Illegal control option at ${path}: expected at least one key 0-127, received empty object`
    );
  }
  for (const k of Object.keys(valueNode[key])) {
    const v = parseInt(k, 10);
    if (isNaN(v) || !isFinite(v) || v < 0 || v > 127) {
      throw new Error(
        `Illegal control option at ${path}: expected keys 0-127, received ${k}`
      );
    }
    walk(definitionNode, path, k, valueNode[key]);
  }
};
