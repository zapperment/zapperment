const controlTypeRanges = {
  button: "[1-4]",
  rotary: "[1-4]",
  macro: "[1-8]",
  clip: ""
};

module.exports = controlType => valueNode =>
  valueNode !== null &&
  valueNode !== undefined &&
  !Array.isArray(valueNode) &&
  typeof valueNode === "object" &&
  valueNode.control !== undefined &&
  valueNode.control.match(
    new RegExp(`^${controlType}${controlTypeRanges[controlType]}$`)
  );
