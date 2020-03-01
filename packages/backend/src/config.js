const configProps = [
  {
    name: "midiPortName",
    envVar: "ZAPPERMENT_MIDI_PORT_NAME",
    type: "string"
  },
  { name: "port", envVar: "ZAPPERMENT_PORT", type: "integer" },
  {
    name: "databaseUrl",
    envVar: "ZAPPERMENT_DATABASE_URL",
    type: "string"
  },
  {
    name: "sceneQuality",
    envVar: "ZAPPERMENT_SCENE_QUALITY",
    type: "float"
  },
  {
    name: "maxAttempts",
    envVar: "ZAPPERMENT_MAX_ATTEMPTS",
    type: "integer"
  },
  {
    name: "composition",
    envVar: "ZAPPERMENT_COMPOSITION",
    type: "string"
  },
  {
    name: "reasonSetSceneInAdvance",
    envVar: "ZAPPERMENT_REASON_SET_SCENE_IN_ADVANCE",
    type: "string"
  },
  {
    name: "abletonLiveSetSceneInAdvance",
    envVar: "ZAPPERMENT_ABLETON_LIVE_SET_SCENE_IN_ADVANCE",
    type: "string"
  }
];

const converters = {
  string: s => s,
  integer: s => parseInt(s, 10),
  float: s => parseFloat(s),
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
