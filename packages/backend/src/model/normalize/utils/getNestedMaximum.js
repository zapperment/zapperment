const reduceNested = require("./reduceNested");

/**
 * Retrieves the a maximum value of a property inside an array of objects.
 * Example:
 * <code>
 * const data = {
 *   { foo: { bar: 1} },
 *   { foo: { bar: 2} },
 *   { foo: { bar: 3} }
 * }
 * getNestedMaximum(data, 'foo.bar'); // 3
 * </code>
 * @param {object} [data] An array of objects that contain the nested property
 *                        to retrieve the maximum value of
 * @param {string} [path] The path to retrieve the value from the objects in the
 *                        array
 */
module.exports = reduceNested((acc, curr) => Math.max(acc, curr));
