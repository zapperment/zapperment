module.exports = controlType => valueNode =>
  valueNode !== null &&
  valueNode !== undefined &&
  !Array.isArray(valueNode) &&
  typeof valueNode === "object" &&
  Object.keys(valueNode).some(v =>
    new RegExp(`^${controlType}[1-4]$`).test(v)
  );
