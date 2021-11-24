const {
  constants: { NOTE_ON },
  utils: { getTypeAndChannel },
} = require("@zapperment/midi");

module.exports = (message) => {
  const { type } = getTypeAndChannel(message);
  return type === NOTE_ON && message[2] > 0;
};
