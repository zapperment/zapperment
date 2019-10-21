const { normalizeClaps } = require("./utils");
const normalizeScene = require("./normalizeScene");

module.exports = rawData => {
  const maxClaps = rawData.reduce(
    (acc, loop) => Math.max(acc, loop.stats.claps),
    0
  );

  return rawData
    .map(loop => ({
      input: normalizeScene(loop.scene.current),
      output: [normalizeClaps(loop.stats.claps, maxClaps)]
    }))
    .filter(Boolean);
};
