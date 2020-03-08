const configProps = [
  {
    name: "databaseUrl",
    envVar: "ZAPPERMENT_DATABASE_URL",
    type: "string"
  },
  {
    name: "qtagThresholdVBad",
    envVar: "ZAPPERMENT_QTAG_THRESHOLD_VBAD",
    type: "integer"
  },
  {
    name: "qtagThresholdBad",
    envVar: "ZAPPERMENT_QTAG_THRESHOLD_BAD",
    type: "integer"
  },
  {
    name: "qtagThresholdGood",
    envVar: "ZAPPERMENT_QTAG_THRESHOLD_GOOD",
    type: "integer"
  },
  {
    name: "qtagThresholdVGood",
    envVar: "ZAPPERMENT_QTAG_THRESHOLD_VGOOD",
    type: "integer"
  },
  {
    name: "refDataPartitions",
    envVar: "ZAPPERMENT_REF_DATA_PARTITIONS",
    type: "integer"
  }
];

const converters = {
  string: s => s,
  integer: s => parseInt(s, 10),
  float: s => parseFloat(s),
  boolean: s => s.toLowerCase() === 'true'
};

module.exports = configProps.reduce((config, { envVar, type, name }) => {
  const value = process.env[envVar];
  if (value === undefined) {
    throw new Error(
      `Environment variable ${envVar} is not defined – did you forget to copy the .env.example file to .env?`
    );
  }
  return {
    ...config,
    [name]: converters[type](value)
  };
}, {});
