const { initContext, printContext } = require("./utils");
const walk = require("./utils/walk");
const definition = require("./definition");

module.exports = track => {
  const nextTrack = JSON.parse(JSON.stringify(track));
  const context = initContext(nextTrack);
  try {
    walk(definition, "", "", nextTrack, context);
  } catch (error) {
    printContext(error, context);
    process.exit(1);
  }
  return nextTrack;
};
