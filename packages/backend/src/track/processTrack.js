const walk = require("./utils/walk");
const definition = require("./definition");

module.exports = value => walk("", definition, value);
