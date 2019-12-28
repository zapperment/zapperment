const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers(
  (acc, curr) => Math.min(acc, curr),
  Number.MAX_SAFE_INTEGER
);
