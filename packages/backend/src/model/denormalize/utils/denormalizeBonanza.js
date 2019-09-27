const denormalizeNumber = require("./denormalizeNumber");

const bonanzaBoolKeys = ["lowCut", "rateOneEighth", "sawSolo"];
const bonanzaMaxMap = {
  pulsarLevel: 127,
  filter: 90,
  filterEnv: 127
};

module.exports = (normalizedValue, key) => {
  if (bonanzaBoolKeys.includes(key)) {
    return Boolean(normalizedValue);
  }

  return denormalizeNumber(normalizedValue, bonanzaMaxMap[key]);
};
