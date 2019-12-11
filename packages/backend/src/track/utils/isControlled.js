const isControlledByButton = require("./isControlledByButton");
const isControlledByRotary = require("./isControlledByRotary");

module.exports = valueNode =>
  isControlledByButton(valueNode) || isControlledByRotary(valueNode);
