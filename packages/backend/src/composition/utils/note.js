const string = require("./string");
const isNote = require("./isNote");

module.exports = (path, key, valueNode, context) => {
  string(path, key, valueNode, context);
  if (!isNote(valueNode)) {
    throw new Error(
      `Property at ${path} must be a MIDI note name, received ${valueNode}`
    );
  }
};
