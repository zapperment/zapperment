const initStorage = require("./initStorage");

module.exports = async () => (await initStorage()).loops;
