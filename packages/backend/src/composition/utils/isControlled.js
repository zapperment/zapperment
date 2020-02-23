const isControlledByButton = require("./isControlledByButton");
const isControlledByClip = require("./isControlledByClip");
const isControlledByMacro = require("./isControlledByMacro");
const isControlledByRotary = require("./isControlledByRotary");

module.exports = valueNode =>
  isControlledByButton(valueNode) ||
  isControlledByClip(valueNode) ||
  isControlledByMacro(valueNode) ||
  isControlledByRotary(valueNode);
