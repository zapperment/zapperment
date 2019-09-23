const normalizeNumber = require("./normalizeNumber");
const { PREFIX_BONANZA } = require("../../constants");

module.exports = bonanza => ({
  [`${PREFIX_BONANZA}_pulsarLevel`]: normalizeNumber(bonanza.pulsarLevel, 127),
  [`${PREFIX_BONANZA}_filter`]: normalizeNumber(bonanza.filter, 90),
  [`${PREFIX_BONANZA}_filterEnv`]: normalizeNumber(bonanza.filterEnv, 127),
  [`${PREFIX_BONANZA}_lowCut`]: bonanza.lowCut ? 1 : 0,
  [`${PREFIX_BONANZA}_rateOneEighth`]: bonanza.rateOneEighth ? 1 : 0,
  [`${PREFIX_BONANZA}_sawSolo`]: bonanza.sawSolo ? 1 : 0
});
