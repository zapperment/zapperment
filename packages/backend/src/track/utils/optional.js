const array = require("./array");
const walk = require("./walk");

module.exports = (definitionNode, defaultValue = null) => (
  path,
  key,
  valueNode
) => {
  const nextPath = path.length ? `${path}.${key}` : key;
  const nextValueNode = valueNode[key];
  if (nextValueNode === undefined) {
    valueNode[key] = defaultValue;
    return;
  }
  if (Array.isArray(definitionNode)) {
    array(nextPath, nextValueNode);
    nextValueNode.forEach(curr => walk(nextPath, definitionNode[0], curr));
    return;
  }

  walk(nextPath, definitionNode, nextValueNode);
};
