module.exports = ({ name, def, argv }) =>
  `${argv[name] !== undefined && argv[name] !== "" ? argv[name] : def || ""}`;
