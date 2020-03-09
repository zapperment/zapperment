module.exports = ({ name, def, argv }) => {
  let val;
  try {
    val =
      argv[name] !== undefined && argv[name] !== ""
        ? JSON.parse(argv[name])
        : def || {};
  } catch {
    console.error(`Argument ${name} must be valid JSON data`);
    process.exit(1);
  }
  return val;
};

