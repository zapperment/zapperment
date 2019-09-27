const { denormalizeNumber, denormalizeBonanza } = require("./utils");
const {
  PREFIX_MIXER,
  PREFIX_PERCUSSION,
  PREFIX_BONANZA
} = require("../constants");

module.exports = normalizedScene => {
  const result = {
    mixer: [],
    percussion: {},
    bonanza: {}
  };

  Object.keys(normalizedScene).map(key => {
    const prefix = key.split("_")[0];

    if (prefix === PREFIX_MIXER) {
      result.mixer.push({
        channel: parseInt(key.split("_")[1], 10),
        muted: Boolean(normalizedScene[key])
      });
    }

    if (prefix === PREFIX_PERCUSSION) {
      result.percussion[key.split("_")[1]] = denormalizeNumber(
        normalizedScene[key],
        6
      );
    }

    if (prefix === PREFIX_BONANZA) {
      const bonanzaKey = key.split("_")[1];
      result.bonanza[bonanzaKey] = denormalizeBonanza(
        normalizedScene[key],
        bonanzaKey
      );
    }
  });

  return result;
};
