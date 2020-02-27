const { processChannel, initErrorInfo, printErrorInfo } = require("./utils");

/**
 * Given a composition object created from a composition definition file with defaults
 * set and values converted to MIDI numbers, this function goes through the
 * composition definition object tree and replaces parts that are controlled
 * by actual values, set by random according to the controller configuration.
 *
 * @returns {object} Object containing two properties: (1) scene – the
 *                   composition's scene, i.e. the final values for all elements
 *                   in all tracks; (2) commands – an object containing data
 *                   that can be used to dispatch MIDI control change
 *                   messages to Reason to set the composition scene
 */
module.exports = convertedCompositionWithDefaults => {
  const errorInfo = initErrorInfo(convertedCompositionWithDefaults);
  const compositionScene = {
    ...convertedCompositionWithDefaults
  };

  const compositionCommands = {};

  try {
    compositionScene.tracks = compositionScene.tracks
      .map(track => {
        const { commands, scene } = processChannel(track, errorInfo);
        compositionCommands[`track${track.trackNumber}`] = commands;
        return scene;
      })
      .filter(scene => scene.playing === 127);
  } catch (error) {
    printErrorInfo(error, errorInfo);
    process.exit(1);
  }
  return {
    scene: compositionScene,
    commands: compositionCommands
  };
};
