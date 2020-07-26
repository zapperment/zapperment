module.exports = (data, path) => {
  const walk = (remainingSegments, currentNode, values = []) => {
    if (currentNode === null) {
      return values;
    }
    if (Array.isArray(currentNode)) {
      return values.concat(
        currentNode.reduce(
          (acc, curr) => acc.concat(walk(remainingSegments, curr)),
          []
        )
      );
    }
    if (remainingSegments.length === 1) {
      return values.concat(currentNode[remainingSegments[0]]);
    }
    const currentSegment = remainingSegments[0];
    const nextNode = currentNode[currentSegment];
    return values.concat(walk(remainingSegments.slice(1), nextNode));
  };
  return walk(path.split("."), data);
  // const result = walk(path.split("."), data);
  // return result.length === 1 ? result[0] : result;
};
