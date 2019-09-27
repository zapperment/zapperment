const normalizeNumber = require("./normalizeNumber");
const { PREFIX_PERCUSSION } = require("../../constants");

module.exports = percussion => ({
  [`${PREFIX_PERCUSSION}_pattern`]: normalizeNumber(percussion.pattern, 6)
});
