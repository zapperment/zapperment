const array = require("./array");
const walk = require("./walk");

module.exports = definitionNode => (path, key, valueNode, context) => {
  const nextPath = path.length ? `${path}.${key}` : key;
  const nextValueNode = valueNode[key];
  if (nextValueNode === undefined) {
    throw new Error(`Missing required property ${nextPath}`);
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
      throw new Error(`Property ${nextPath} cannot be null`);
    }
    if (typeof nextValueNode !== "object") {
      throw new Error(
        `Expected object at ${nextPath}, received ${typeof nextValueNode}`
      );
    }
  }
  if (key === "name") {
    context.track = { name: nextValueNode };
  }
  walk(definitionNode, nextPath, key, nextValueNode, context);
};
