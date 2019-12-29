const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers({ reducer: (acc, curr) => acc + curr });
