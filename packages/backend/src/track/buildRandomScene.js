const { processChannel, initErrorInfo, printErrorInfo } = require("./utils");

/**
 * Given a track object created from a track definition file with defaults
 * set and values converted to MIDI numbers, this function goes through the
 * track definition object tree and replaces parts that are controlled
 * by actual values, set by random according to the controller configuration.
 *
 * @returns {object} Object containing two properties: (1) scene – the
 *                   track's scene, i.e. the final values for all elements
 *                   in all channels; (2) commands – array of MIDI command
 *                   objects that can be used to dispatch MIDI controller
 *                   commands to Reason to set the track scene
 */
module.exports = convertedTrackWithDefaults => {
  const errorInfo = initErrorInfo(convertedTrackWithDefaults);
  const trackScene = {
    ...convertedTrackWithDefaults
  };
  const trackCommands = [];

  try {
    trackScene.channels = trackScene.channels
      .map(channel => {
        const { commands, scene } = processChannel(channel, errorInfo);
        trackCommands.push(...commands);
        return scene;
      })
      .filter(scene => scene.playing === 127);
  } catch (error) {
    printErrorInfo(error, errorInfo);
    process.exit(1);
  }
  return {
    scene: trackScene,
    commands: trackCommands
  };
};
