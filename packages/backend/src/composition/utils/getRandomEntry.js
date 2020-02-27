const getRandomInt = require("./getRandomInt");

module.exports = object => {
  const entries = Object.entries(object);
  return entries[getRandomInt(0, entries.length - 1)];
};
