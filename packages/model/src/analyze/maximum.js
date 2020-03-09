const createAnalyzers = require("./createAnalyzers");

module.exports = createAnalyzers({
  reducer: (acc, curr) => Math.max(acc, curr)
});
