const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers((acc, curr) => acc + curr);
