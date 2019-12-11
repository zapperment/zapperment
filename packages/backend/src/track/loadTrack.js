const { readFileSync } = require("fs");
module.exports = path => JSON.parse(readFileSync(path, "utf8"));
