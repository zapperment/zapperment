const walk = require("./walk");
const isControlled = require("./isControlled");
const walkControlled = require("./walkControlled");

module.exports = definitionNode => (path, key, valueNode, context) => {
  let nextValueNode = valueNode[key];
  if (isControlled(nextValueNode)) {
    walkControlled(definitionNode, path, key, nextValueNode, context);
  } else {
    walk(definitionNode, path, key, valueNode, context);
  }
};
