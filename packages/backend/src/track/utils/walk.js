module.exports = (definitionNode, path, key,valueNode) => {
  if (typeof definitionNode === "function") {
    definitionNode(path, key, valueNode);
    return;
  }
  for (const [nextKey, value] of Object.entries(definitionNode)) {
    value(path, nextKey, valueNode);
  }
};
