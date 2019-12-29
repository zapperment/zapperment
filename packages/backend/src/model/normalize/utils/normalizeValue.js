/**
 * Calculates a normalized value according to a given range.
 *
 * @param {number} [val] The value to normalize
 * @param {number} [min] The minimum value of the normalization range
 * @param {number} [max] The maximum value of the normalization range
 * @return {number} The normalized input value
 */
module.exports = (val, min, max) => {
  if (min > max) {
    throw new Error(
      `Illegal argument for normalize function: “min” must be lower than or equal to “max” – received min=${min} / max=${max}
${global.debugInfo}`
    );
  }
  if (val < min) {
    return 0;
  }
  if (val > max) {
    return 1;
  }
  if (min === max) {
    return 0;
  }
  return (val - min) / (max - min);
};
