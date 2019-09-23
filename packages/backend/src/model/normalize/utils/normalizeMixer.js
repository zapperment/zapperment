const { PREFIX_MIXER } = require("../../constants");

module.exports = mixer =>
  mixer.reduce(
    (acc, channel) => ({
      ...acc,
      [`${PREFIX_MIXER}_${("" + channel.channel).padStart(
        2,
        "0"
      )}`]: channel.muted ? 1 : 0
    }),
    {}
  );
