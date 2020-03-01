module.exports = (data, path) => {
  const segments = path.split(".");
  const walk = (remainingSegments, currentNode) => {
    if (remainingSegments.length === 1) {
      return currentNode[remainingSegments[0]];
    }
    const currentSegment = remainingSegments[0];
    const nextNode = currentNode[currentSegment];
    return walk(remainingSegments.slice(1), nextNode);
  };
  return walk(segments, data);
};
