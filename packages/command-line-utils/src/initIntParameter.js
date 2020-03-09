module.exports = ({ name, min, max, def, argv }) => {
  const val = argv[name] !== undefined ? parseInt(argv[name], 10) : def || min;
  if (isNaN(val) || val < min || val > max) {
    console.error(`Argument ${name} must be ${min}-${max}`);
    process.exit(1);
  }
  return val;
};
