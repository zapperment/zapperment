const walkControlledByMinMaxRotary = require("./walkControlledByMinMaxRotary");
const walkControlledBySteppedRotary = require("./walkControlledBySteppedRotary");

module.exports = (definitionNode, path, key, valueNode) => {
  if (Object.keys(valueNode[key]).some(k => k === "min" || k === "max")) {
    walkControlledByMinMaxRotary(definitionNode, path, key, valueNode);
  } else {
    walkControlledBySteppedRotary(definitionNode, path, key, valueNode);
  }
};
