/**
 * Calculates the original value from a normalized value according to a given range.
 *
 * @param {number} [val] The value to denormalize
 * @param {number} [min] The minimum value of the normalization range
 * @param {number} [max] The maximum value of the normalization range
 * @return {number} The denormalized input value
 */
module.exports = (val, min, max) => {
  if (min > max) {
    throw new Error(
      `Illegal argument for denormalize function: “min” must be lower than or equal to “max” – received min=${min} / max=${max}`
    );
  }
  return val * (max - min) + min;
};
