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
    array(nextPath, key, nextValueNode);
    nextValueNode.forEach(curr => walk(definitionNode[0], nextPath, key, curr));
    return;
  }

  walk(definitionNode, nextPath, key, nextValueNode);
};
