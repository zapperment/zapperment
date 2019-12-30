const { processChannel } = require("./utils");

/**
 * Given a track object created from a track definition file with defaults
 * set and values converted to MIDI numbers, this function goes through the
 * track definition object tree and replaces parts that are controlled
 * by actual values, set by random according to the controller configuration.
 *
 * @returns {object} Object containing two properties: (1) scene – the
 *                   track's scene, i.e. the final values for all elements
 *                   in all channels; (2) midiCommands – array of MIDI command
 *                   objects that can be used to dispatch MIDI controller
 *                   commands to Reason to set the track scene
 */
module.exports = convertedTrackWithDefaults => {
  const trackScene = {
    ...convertedTrackWithDefaults
  };
  const trackMidiCommands = [];

  trackScene.channels = trackScene.channels
    .map(channel => {
      const { midiCommands, scene } = processChannel(channel);
      trackMidiCommands.push(...midiCommands);
      return scene;
    })
    .filter(scene => scene.playing === 127);
  return {
    scene: trackScene,
    midiCommands: trackMidiCommands
  };
};
