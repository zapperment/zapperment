const walk = require("./walk");

module.exports = (definitionNode, path, key, valueNode) => {
  for (const k of Object.keys(valueNode[key])) {
    if (k !== "min" && k !== "max") {
      throw new Error(
        `Illegal control option at ${path}: expected min or max, received ${k}`
      );
    }
  }
  if (
    valueNode[key].min === undefined ||
    valueNode[key].max === undefined
  ) {
    throw new Error(
      `Illegal control definition at ${path}: you need to define both min and max`
    );
  }
  walk(definitionNode, path, "min", valueNode[key]);
  walk(definitionNode, path, "max", valueNode[key]);
};
