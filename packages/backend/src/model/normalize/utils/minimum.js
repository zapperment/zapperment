const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers({
  reducer: (acc, curr) => Math.min(acc, curr),
  initialValue: Number.MAX_SAFE_INTEGER
});
