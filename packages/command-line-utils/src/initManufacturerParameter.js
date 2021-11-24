const initStrParameter = require('./initStrParameter');

module.exports = ({ name, def, argv }) => {
  const manufacturer = argv[name];
  if (
    typeof manufacturer === "string" &&
    manufacturer.length !== 2 &&
    manufacturer.length !== 6
  ) {
    console.error(
      `Argument ${name} must be a string of hex values that is either 2 or 6 characters long, example: ${def}`
    );
    process.exit(1);
  }
  return initStrParameter({name,def,argv});
};
