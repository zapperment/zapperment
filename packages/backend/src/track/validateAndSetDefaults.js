const { initErrorInfo, printErrorInfo } = require("./utils");
const walk = require("./utils/walk");
const definition = require("./definition");

module.exports = track => {
  const nextTrack = JSON.parse(JSON.stringify(track));
  const errorInfo = initErrorInfo(nextTrack);
  try {
    walk(definition, "", "", nextTrack, errorInfo);
  } catch (error) {
    printErrorInfo(error, errorInfo);
    process.exit(1);
  }
  return nextTrack;
};
