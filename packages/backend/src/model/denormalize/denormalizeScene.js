const { PREFIX_MIXER, PREFIX_NERVOMAT } = require("../constants");

module.exports = normalizedScene => {
  const result = {
    mixer: [],
    nervomat: {}
  };

  Object.keys(normalizedScene).map(key => {
    const prefix = key.split("_")[0];

    if (prefix === PREFIX_MIXER) {
      result.mixer.push({
        channel: parseInt(key.split("_")[1], 10),
        muted: Boolean(normalizedScene[key])
      });
    }

    if (prefix === PREFIX_NERVOMAT) {
      result.nervomat.annoyMe = Boolean(normalizedScene[key]);
    }
  });

  return result;
};
