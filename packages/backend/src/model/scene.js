const { getRandomInt, getRandomBool } = require("./utils");
const trainNetwork = require("./trainNetwork");
const { normalizeScene } = require("./normalize");
const {
  PREFIX_BONANZA,
  PREFIX_PERCUSSION,
  PREFIX_MIXER,
  CONFIG_SCENE_QUALITY,
  MAX_ATTEMPTS
} = require("./constants");

let trainedNet;

function buildRandomScene() {
  return {
    mixer: [
      // bass
      { channel: 1, muted: getRandomBool() },
      // kick
      { channel: 2, muted: getRandomBool() },
      // tom
      { channel: 3, muted: getRandomBool() },
      // hi hat
      { channel: 4, muted: getRandomBool() },
      // fx
      { channel: 5, muted: getRandomBool() },
      // spel gtr 1
      { channel: 6, muted: getRandomBool() },
      // spel gtr 2
      { channel: 7, muted: getRandomBool() },
      // spel gtr 3
      { channel: 8, muted: getRandomBool() },
      // spel gtr 4
      { channel: 9, muted: getRandomBool() },
      // e-piano
      { channel: 10, muted: getRandomBool() },
      // bonanza bassline
      { channel: 11, muted: getRandomBool() }
    ],
    percussion: {
      pattern: getRandomInt(0, 6)
    },
    bonanza: {
      pulsarLevel: getRandomInt(0, 127),
      filter: getRandomInt(0, 90),
      filterEnv: getRandomInt(0, 127),
      lowCut: getRandomBool(),
      rateOneEighth: getRandomBool(),
      sawSolo: getRandomBool()
    }
  };
}

const denormalizeNumber = (value, max) => {
  return Math.floor(value * max);
};

const bonanzaBoolKeys = ["lowCut", "rateOneEighth", "sawSolo"];
const bonanzaMaxMap = {
  pulsarLevel: 127,
  filter: 90,
  filterEnv: 127
};

const denormalizeBonanza = (normalizedValue, key) => {
  if (bonanzaBoolKeys.includes(key)) {
    return Boolean(normalizedValue);
  }

  return denormalizeNumber(normalizedValue, bonanzaMaxMap[key]);
};

const denormalizeScene = normalizedScene => {
  const result = {
    mixer: [],
    percussion: {},
    bonanza: {}
  };

  Object.keys(normalizedScene).map(key => {
    const prefix = key.split("_")[0];

    if (prefix === PREFIX_MIXER) {
      result.mixer.push({
        channel: parseInt(key.split("_")[1], 10),
        muted: Boolean(normalizedScene[key])
      });
    }

    if (prefix === PREFIX_PERCUSSION) {
      result.percussion[key.split("_")[1]] = denormalizeNumber(
        normalizedScene[key],
        6
      );
    }

    if (prefix === PREFIX_BONANZA) {
      const bonanzaKey = key.split("_")[1];
      result.bonanza[bonanzaKey] = denormalizeBonanza(
        normalizedScene[key],
        bonanzaKey
      );
    }
  });

  return result;
};

const initSceneGeneration = storage =>
  storage.db
    .collection("loops")
    .find({})
    .toArray((err, docs) => {
      trainedNet = trainNetwork(docs);
    });

const buildNewScene = () => {
  let output;
  let input = [];
  let attempts = 0;

  do {
    input = normalizeScene(buildRandomScene());
    output = trainedNet(input);
  } while (output < CONFIG_SCENE_QUALITY && ++attempts < MAX_ATTEMPTS);

  console.log(`NEW SCENE PREDICTION: ${output} (${attempts} attempts)`);

  return denormalizeScene(input);
};

module.exports = {
  denormalizeScene,
  buildRandomScene,
  buildNewScene,
  initSceneGeneration
};
