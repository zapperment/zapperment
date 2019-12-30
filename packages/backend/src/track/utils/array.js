/**
 * @param {string} [path] The current path in the track definition (used for error messages)
 * @param {string} [key] The key at the current path (not used at this case)
 * @param {Array} [valueNode] The node at the current path that should be an array
 * @throws {Error} If provided [valueNode] is not an array, of if it is an empy array
 */
module.exports = (path, key, valueNode) => {
  if (!Array.isArray(valueNode)) {
    throw new Error(`Expected an array at ${path}`);
  }
  if (valueNode.length === 0) {
    throw new Error(`Array at ${path} cannot be empty`);
  }
};
