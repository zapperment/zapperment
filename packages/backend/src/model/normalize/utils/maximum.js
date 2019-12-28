const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers((acc, curr) => Math.max(acc, curr));
