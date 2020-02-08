module.exports = ({ name, def, argv }) => {
  const val = argv[name] !== undefined && argv[name] !== ""
    ? argv[name]
    : def;
  if (typeof val !== 'string') {
    console.error(`Argument ${name} must be a string`);
    process.exit(1);
  }
  return val;
};
