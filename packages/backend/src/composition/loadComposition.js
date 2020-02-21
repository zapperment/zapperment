const { readFileSync } = require("fs");
const { getCompositionPath } = require("./utils");
const validateAndSetDefaults = require("./validateAndSetDefaults");
const convertValuesToMidiNumbers = require("./convertValuesToMidiNumbers");

/**
 * Loads a track definition file and returns the raw track definition
 * data object.
 *
 * @param {string} [compositionName] The name of the composition, e.g. “hamburg-in-autumn”
 *                             (no file extension)
 * @return {object} The contents of the composition's definition file
 */
module.exports = compositionName => {
  const composition = JSON.parse(
    readFileSync(getCompositionPath(compositionName), "utf8")
  );
  const compositionWithDefaults = validateAndSetDefaults(composition);

  return convertValuesToMidiNumbers(compositionWithDefaults);
};
