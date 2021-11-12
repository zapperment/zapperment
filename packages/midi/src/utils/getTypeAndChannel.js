const { SYSEX_START } = require("../constants");

module.exports = (message) => {
  const status = message[0];
  let type;
  let channel = null;
  if (status < SYSEX_START) {
    type = (status >> 4) << 4;
    channel = (status & 0x0f) + 1;
  } else {
    type = status;
  }
  return { type, channel };
};
