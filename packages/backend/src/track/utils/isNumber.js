module.exports = value =>
  typeof value === "number" && !isNaN(value) && isFinite(value);
