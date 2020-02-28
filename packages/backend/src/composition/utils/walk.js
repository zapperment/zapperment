module.exports = (definitionNode, path, key, valueNode, context) => {
  if (typeof definitionNode === "function") {
    definitionNode(path, key, valueNode, context);
    return;
  }
  for (const [nextKey, value] of Object.entries(definitionNode)) {
    value(path, nextKey, valueNode, context);
  }
};
