const walkControlledByMinMaxRotaryOrMacro = require("./walkControlledByMinMaxRotaryOrMacro");
const walkControlledBySteppedRotaryOrMacro = require("./walkControlledBySteppedRotaryOrMacro");

module.exports = (definitionNode, path, key, valueNode, context) => {
  if (Object.keys(valueNode[key]).some(k => k === "min" || k === "max")) {
    walkControlledByMinMaxRotaryOrMacro(definitionNode, path, key, valueNode, context);
  } else {
    walkControlledBySteppedRotaryOrMacro(definitionNode, path, key, valueNode, context);
  }
};
