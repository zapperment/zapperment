const walk = require("./walk");

module.exports = ({ reason, live }) => (
  path,
  key,
  valueNode,
  context
) => {
  switch (context.daw) {
    case 'Reason':
      walk(reason, path, key, valueNode, context);
      break;
    case 'Ableton Live':
      walk(live, path, key, valueNode, context);
      break;
    default:
  }
};
