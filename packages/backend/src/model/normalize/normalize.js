const { normalizeClaps } = require("./utils");
const normalizeScene = require("./normalizeScene");
const { CONFIG_CHANNELS } = require("../constants");

module.exports = rawData => {
  const maxClaps = rawData.reduce(
    (acc, loop) => Math.max(acc, loop.stats.claps),
    0
  );

  return rawData
    .map(loop => {
      // protect from corrupted data
      if (
        !loop.scene.current ||
        !loop.scene.current.mixer ||
        loop.scene.current.mixer.length !== CONFIG_CHANNELS
      ) {
        return null;
      }

      return {
        input: normalizeScene(loop.scene.current),
        output: [normalizeClaps(loop.stats.claps, maxClaps)]
      };
    })
    .filter(Boolean);
};
