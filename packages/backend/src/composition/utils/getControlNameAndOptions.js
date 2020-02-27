/**
 * Given a value node that defines a control, returns the name if the control (e.g. "button1")
 * and the control value option (e.g. { on: 127, off: 0 }).
 *
 * @param valueNode
 * @return {[string, object]}
 */
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
