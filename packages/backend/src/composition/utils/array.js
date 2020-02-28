/**
 * @param {string} [path] The current path in the track definition (used for error messages)
 * @param {string} [key] The key at the current path (not used at this case)
 * @param {Array} [valueNode] The node at the current path that should be an array
 * @param {object} [context] Information about what part of the track definition is
 *                           currently being processed, used to give hints to track
 *                           definition authors when errors occur
 * @throws {Error} If provided [valueNode] is not an array, or if it is an empty array
 */
module.exports = (path, key, valueNode, context) => {
  if (!Array.isArray(valueNode)) {
    throw new Error(`Expected an array at ${path}`);
  }
  if (valueNode.length === 0) {
    throw new Error(`Array at ${path} cannot be empty`);
  }
};
