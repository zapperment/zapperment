const { isObject, isNumber } = require("../../../utils");

module.exports = (reducer, initialValue = 0, defaultValue = 0) => (
  data,
  path
) => {
  const segments = path.split(".");
  const walk = (remainingSegments, currentNode) => {
    if (Array.isArray(currentNode)) {
      const values = currentNode
        .map(curr => walk(remainingSegments, curr))
        .filter(curr => curr !== null);
      if (values.length === 0) {
        return null;
      }
      return values.reduce((acc, curr) => acc + curr, 0);
    }
    if (remainingSegments.length === 1) {
      const finalValue = currentNode[remainingSegments[0]];
      if (isNumber(finalValue)) {
        return currentNode[remainingSegments[0]];
      }
      if (Array.isArray(finalValue)) {
        const values = finalValue.filter(v => typeof v === "number");
        if (values.length === 0) {
          return null;
        }
        return values.reduce((acc, curr) => acc + curr, 0);
      }
      return null;
    }
    const currentSegment = remainingSegments[0];
    if (isObject(currentNode)) {
      const nextNode = currentNode[currentSegment];
      if (isObject(nextNode) || Array.isArray(nextNode)) {
        return walk(remainingSegments.slice(1), nextNode);
      }
      return null;
    }
    return null;
  };
  const values = data
    .map(curr => walk(segments, curr))
    .filter(value => typeof value === "number");
  return (values.length === 0
    ? defaultValue
    : values.reduce(
        (acc, curr, i, arr) => reducer(acc, curr, i, arr),
        initialValue
      ));
};
