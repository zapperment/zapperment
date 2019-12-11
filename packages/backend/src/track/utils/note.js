const string = require("./string");

module.exports = (path, key, valueNode) => {
  string(path, key, valueNode);
  if (!/^(([ACDFG]#?|[BE])[-[12]|([ACDFG]#?|[BE])[0-7]|([CDF]#?|E)8|G8)/.test(valueNode)) {
    throw new Error(
      `Property at ${path} must be a MIDI note name, received ${valueNode}`
    );
  }
};

