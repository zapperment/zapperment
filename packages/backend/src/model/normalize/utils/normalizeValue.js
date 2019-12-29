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
      `Illegal argument for normalize function: “min” must be lower than or equal to “max” – received min=${min} / max=${max}`
    );
  }
  if (val < min) {
    throw new Error(
      `Illegal argument for normalize function: “val” must be greater than or equal to “min” – received val=${val} / min=${min}`
    );
  }
  if (val > max) {
    throw new Error(
      `Illegal argument for normalize function: “val” must be lower than or equal to “max” – received val=${val} / max=${max}`
    );
  }
  if (min === max) {
    return 0;
  }
  return (val - min) / (max - min);
};
