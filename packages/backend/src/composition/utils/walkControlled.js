const getControlNameAndOptions = require("./getControlNameAndOptions");
const walkControlledByButton = require("./walkControlledByButton");
const walkControlledByClip = require("./walkControlledByClip");
const walkControlledByRotaryOrMacro = require("./walkControlledByRotaryOrMacro");

module.exports = (definitionNode, path, key, valueNode, errorInfo) => {
  const [controlName, controlOptions] = getControlNameAndOptions(valueNode);
  const nextValueNode = { [controlName]: controlOptions };
  const nextPath = `${path}.${key}.${controlName}`;
  if (controlName.startsWith("button")) {
    walkControlledByButton(
      definitionNode,
      nextPath,
      controlName,
      nextValueNode,
      errorInfo
    );
  } else if (
    controlName.startsWith("rotary") ||
    controlName.startsWith("macro")
  ) {
    walkControlledByRotaryOrMacro(
      definitionNode,
      nextPath,
      controlName,
      nextValueNode,
      errorInfo
    );
  } else if (controlName === "clip") {
    walkControlledByClip(
      definitionNode,
      nextPath,
      controlName,
      nextValueNode,
      errorInfo
    );
  } else {
    throw new Error(
      `Illegal control type at ${path}.${key}: expected button or rotary, received ${controlName}`
    );
  }
};
