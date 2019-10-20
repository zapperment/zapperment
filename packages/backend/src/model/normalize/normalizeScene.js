const {
  normalizeMixer,
  normalizeNervomat
} = require("./utils");

module.exports = ({ mixer, nervomat }) => ({
  ...normalizeMixer(mixer),
  ...normalizeNervomat(nervomat)
});
