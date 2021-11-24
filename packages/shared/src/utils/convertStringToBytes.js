const chunkString = require("./chunkString");

module.exports = str =>
  chunkString(str, 2).map(chunk => Number.parseInt(chunk, 16));
