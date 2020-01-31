module.exports = (definitionNode, path, key, valueNode, errorInfo) => {
  if (typeof definitionNode === "function") {
    definitionNode(path, key, valueNode, errorInfo);
    return;
  }
  for (const [nextKey, value] of Object.entries(definitionNode)) {
    value(path, nextKey, valueNode, errorInfo);
  }
};
