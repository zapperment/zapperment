const getNestedVariance = require("./getNestedVariance");

module.exports = (data, path) => Math.sqrt(getNestedVariance(data, path));
