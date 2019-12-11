const array = require("./array");
const walk = require("./walk");

module.exports = definitionNode => (path, key, valueNode) => {
  const nextPath = path.length ? `${path}.${key}` : key;
  const nextValueNode = valueNode[key];
  if (nextValueNode === undefined) {
    throw new Error(`Missing required property ${nextPath}`);
  }
  if (Array.isArray(definitionNode)) {
    array(nextPath, nextValueNode);
    nextValueNode.forEach(curr => walk(nextPath, definitionNode[0], curr));
    return;
  }
  walk(nextPath, definitionNode, nextValueNode);
};
