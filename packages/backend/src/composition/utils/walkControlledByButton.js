const walk = require("./walk");

module.exports = (definitionNode, path, key, valueNode, context) => {
  for (const k of Object.keys(valueNode[key])) {
    if (k !== "on" && k !== "off") {
      throw new Error(
        `Illegal control option at ${path}: expected on or off, received ${k}`
      );
    }
  }
  if (
    valueNode[key].on === undefined ||
    valueNode[key].off === undefined
  ) {
    throw new Error(
      `Illegal control definition at ${path}: you need to define both on and off`
    );
  }
  walk(definitionNode, path, "on", valueNode[key], context);
  walk(definitionNode, path, "off", valueNode[key], context);
};
