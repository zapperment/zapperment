const { PREFIX_NERVOMAT } = require("../../constants");

module.exports = ({ annoyMe }) => ({
  [`${PREFIX_NERVOMAT}_annoyme`]: annoyMe ? 1 : 0
});
