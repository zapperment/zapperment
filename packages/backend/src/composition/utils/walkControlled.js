const walkControlledByButton = require("./walkControlledByButton");
const walkControlledByRotary = require("./walkControlledByRotary");

module.exports = (definitionNode, path, key, valueNode, errorInfo) => {
  for (const controlName of Object.keys(valueNode)) {
    const nextPath = `${path}.${key}.${controlName}`;
    if (controlName.startsWith("button")) {
      walkControlledByButton(definitionNode, nextPath, controlName, valueNode, errorInfo);
    } else if (controlName.startsWith("rotary")) {
      walkControlledByRotary(definitionNode, nextPath, controlName, valueNode, errorInfo);
    } else {
      throw new Error(
        `Illegal control type at ${path}.${key}: expected button or rotary, received ${controlName}`
      );
    }
  }
};
