module.exports = (path, definitionNode, valueNode) => {
  if (typeof definitionNode === "function") {
    definitionNode(path, valueNode);
    return;
  }
  for (const [key, value] of Object.entries(definitionNode)) {
    value(path, key, valueNode);
  }
};
