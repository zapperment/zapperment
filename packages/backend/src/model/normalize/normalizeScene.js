const {
  normalizePercussion,
  normalizeBonanza,
  normalizeMixer
} = require("./utils");

module.exports = ({ mixer, percussion, bonanza }) => ({
  ...normalizeMixer(mixer),
  ...normalizePercussion(percussion),
  ...normalizeBonanza(bonanza)
});
