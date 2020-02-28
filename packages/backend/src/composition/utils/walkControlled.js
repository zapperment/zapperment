const getControlNameAndOptions = require("./getControlNameAndOptions");
const walkControlledByButton = require("./walkControlledByButton");
const walkControlledByClip = require("./walkControlledByClip");
const walkControlledByRotaryOrMacro = require("./walkControlledByRotaryOrMacro");

module.exports = (definitionNode, path, key, valueNode, context) => {
  const [controlName, controlOptions] = getControlNameAndOptions(valueNode);
  const nextValueNode = { [controlName]: controlOptions };
  const nextPath = `${path}.${key}.${controlName}`;
  switch (context.daw) {
    case "Reason":
      if (controlName.startsWith("button")) {
        walkControlledByButton(
          definitionNode,
          nextPath,
          controlName,
          nextValueNode,
          context
        );
        return;
      }
      if (controlName.startsWith("rotary")) {
        walkControlledByRotaryOrMacro(
          definitionNode,
          nextPath,
          controlName,
          nextValueNode,
          context
        );
        return;
      }
      throw new Error(
        `Illegal control type at ${path}.${key}: expected button or rotary, received ${controlName}`
      );
    case "Ableton Live":
      if (controlName.startsWith("macro")) {
        walkControlledByRotaryOrMacro(
          definitionNode,
          nextPath,
          controlName,
          nextValueNode,
          context
        );
        return;
      }
      if (controlName === "clip") {
        walkControlledByClip(
          definitionNode,
          nextPath,
          controlName,
          nextValueNode,
          context
        );
        return;
      }
      throw new Error(
        `Illegal control type at ${path}.${key}: expected macro or clip, received ${controlName}`
      );
    default:
  }
};
