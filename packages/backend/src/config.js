const configProps = [
  {
    name: "midiPortNameA",
    envVar: "ZAPPERMENT_BACKEND_MIDI_PORT_NAME_A",
    type: "string"
  },
  {
    name: "midiPortNameB",
    envVar: "ZAPPERMENT_BACKEND_MIDI_PORT_NAME_N",
    type: "string"
  },
  {
    name: "midiPortNameC",
    envVar: "ZAPPERMENT_BACKEND_MIDI_PORT_NAME_C",
    type: "string"
  },
  {
    name: "midiPortNameD",
    envVar: "ZAPPERMENT_BACKEND_MIDI_PORT_NAME_D",
    type: "string"
  },
  {
    name: "initialTempo",
    envVar: "ZAPPERMENT_BACKEND_INITIAL_TEMPO",
    type: "float"
  },
  {
    name: "barsPerLoop",
    envVar: "ZAPPERMENT_BACKEND_BARS_PER_LOOP",
    type: "integer"
  },
  { name: "port", envVar: "ZAPPERMENT_BACKEND_PORT", type: "integer" },
  {
    name: "databaseUrl",
    envVar: "ZAPPERMENT_BACKEND_DATABASE_URL",
    type: "string"
  },
  {
    name: "sceneQuality",
    envVar: "ZAPPERMENT_BACKEND_SCENE_QUALITY",
    type: "float"
  },
  {
    name: "maxAttempts",
    envVar: "ZAPPERMENT_BACKEND_MAX_ATTEMPTS",
    type: "integer"
  }
];

const converters = {
  string: s => s,
  integer: s => parseInt(s, 10),
  float: s => parseFloat(s)
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
