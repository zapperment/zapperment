module.exports = valueNode => [
  valueNode.control,
  Object.entries(valueNode).reduce(
    (acc, [key, val]) =>
      key !== "control"
        ? {
            ...acc,
            [key]: val
          }
        : acc,
    {}
  )
];
