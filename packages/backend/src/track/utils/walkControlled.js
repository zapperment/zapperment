const walk = require("./walk");
const walkControlledByButton = require("./walkControlledByButton");


module.exports = (definitionNode, path, key, valueNode) => {
  for (const controlName of Object.keys(valueNode)) {
    const nextPath = `${path}.${key}.${controlName}`;
    if (controlName.startsWith("button")) {
      walkControlledByButton(definitionNode, nextPath, controlName, valueNode)
    } else if (controlName.startsWith("rotary")) {
      throw new Error(
        `Unsupported feature at ${path}.${key}: Validating and defaulting rotary controlled elements not implemented yet`
      ); // PH_TODO
    } else {
      throw new Error(
        `Illegal control type at ${path}.${key}: expected button or rotary, received ${controlName}`
      );
    }
  }
};
