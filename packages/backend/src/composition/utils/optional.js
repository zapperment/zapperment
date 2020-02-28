const array = require("./array");
const walk = require("./walk");

module.exports = (definitionNode, defaultValue = null) => (
  path,
  key,
  valueNode,
  context
) => {
  const nextPath = path.length ? `${path}.${key}` : key;
  const nextValueNode = valueNode[key];
  if (nextValueNode === undefined) {
    valueNode[key] = defaultValue;
    return;
  }
  if (Array.isArray(definitionNode)) {
    array(nextPath, key, nextValueNode, context);
    nextValueNode.forEach(curr =>
      walk(definitionNode[0], nextPath, key, curr, context)
    );
    return;
  }
  if (typeof definitionNode === "object") {
    if (nextValueNode === null) {
      return;
    }
    if (typeof nextValueNode !== "object") {
      throw new Error(
        `Expected object at ${nextPath}, received ${typeof nextValueNode}`
      );
    }
  }

  walk(definitionNode, nextPath, key, nextValueNode, context);
};
