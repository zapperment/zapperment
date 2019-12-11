const walk = require("./walk");
const isControlled = require("./isControlled");

module.exports = definitionNode => (path, key, valueNode) => {
  let nextValueNode = valueNode[key];
  if (isControlled(nextValueNode)) {
    for (const controlName of Object.keys(nextValueNode)) {
      const nextPath = `${path}.${key}.${controlName}`;
      if (controlName.startsWith("button")) {
        walk(definitionNode, nextPath, "on", nextValueNode[controlName]);
        walk(definitionNode, nextPath, "off", nextValueNode[controlName]);
      }
      else if (controlName.startsWith("rotary")) {
        throw new Error(
          `Unsupported feature at ${path}.${key}: Validating and defaulting rotary controlled elements not implemented yet`
        ); // PH_TODO
      }
      else {
        throw new Error(
          `Illegal control type at ${path}.${key}: expected button or rotary, received ${controlName}`
        );
      }
    }
    return;
  }
  walk(definitionNode, path, key, valueNode);
};
