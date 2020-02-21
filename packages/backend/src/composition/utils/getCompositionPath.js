const { resolve } = require("path");

module.exports = composition =>
  `${resolve(__dirname, "../../../../../compositions", composition)}.json`;
