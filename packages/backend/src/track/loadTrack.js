const { readFileSync } = require("fs");
const { getTrackPath } = require("./utils");
const validateAndSetDefaults = require("./validateAndSetDefaults");
const convertValuesToMidiNumbers = require("./convertValuesToMidiNumbers");

/**
 * Loads a track definition file and returns the raw track definition
 * data object.
 *
 * @param {string} [trackName] The name of the track, e.g. “hamburg-in-autumn”
 *                             (no file extension)
 * @return {object} The contents of the track's definition file
 */
module.exports = trackName => {
  const track = JSON.parse(readFileSync(getTrackPath(trackName), "utf8"));
  const trackWithDefaults = validateAndSetDefaults(track);

  return convertValuesToMidiNumbers(
    trackWithDefaults
  );
};
