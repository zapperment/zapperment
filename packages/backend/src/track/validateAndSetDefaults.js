const walk = require("./utils/walk");
const definition = require("./definition");

module.exports = track => {
  const nextTrack = JSON.parse(JSON.stringify(track))
  walk(definition, "", "", nextTrack);
  return nextTrack;
};
