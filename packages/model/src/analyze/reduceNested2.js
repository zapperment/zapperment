const { isObject } = require("@zapperment/shared");

module.exports = process => ({
  reducer,
  initialValue = 0,
  defaultValue = 0
}) => (data, path) => {
  const segments = path.split(".");
  const values = [];
  const walk = (remainingSegments, currentNode) => {
    if (Array.isArray(currentNode)) {
      currentNode.forEach(curr => walk(remainingSegments, curr));
    }
    if (remainingSegments.length === 1) {
      const processedValue = process(currentNode[remainingSegments[0]]);
      if (processedValue !== null) {
        values.push(processedValue);
      }
      return;
    }
    const currentSegment = remainingSegments[0];
    if (isObject(currentNode)) {
      const nextNode = currentNode[currentSegment];
      if (isObject(nextNode) || Array.isArray(nextNode)) {
        walk(remainingSegments.slice(1), nextNode);
      }
    }
  };
  data.forEach(curr => walk(segments, curr));
  const filteredValues = values.filter(value => typeof value === "number");
  return filteredValues.length === 0
    ? defaultValue
    : filteredValues.reduce(
        (acc, curr, i, arr) => reducer(acc, curr, i, arr),
        initialValue
      );
};
