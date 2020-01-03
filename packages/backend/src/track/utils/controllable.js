const walk = require("./walk");
const isControlled = require("./isControlled");
const walkControlled = require("./walkControlled");

module.exports = definitionNode => (path, key, valueNode, errorInfo) => {
  let nextValueNode = valueNode[key];
  if (isControlled(nextValueNode)) {
    walkControlled(definitionNode, path, key, nextValueNode, errorInfo);
  } else {
    walk(definitionNode, path, key, valueNode, errorInfo);
  }
};
