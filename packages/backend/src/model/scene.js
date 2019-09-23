const trainNetwork = require("./trainNetwork");
const normalizeScene = require("./normalize/scene");
const {
  PREFIX_BONANZA,
  PREFIX_PERCUSSION,
  PREFIX_MIXER,
  CONFIG_SCENE_QUALITY,
  MAX_ATTEMPTS
} = require("./constants");

let trainedNet;

function randomBool() {
  return Math.random() < 0.5;
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRandomScene() {
  return {
    mixer: [
      // bass
      { channel: 1, muted: randomBool() },
      // kick
      { channel: 2, muted: randomBool() },
      // tom
      { channel: 3, muted: randomBool() },
      // hi hat
      { channel: 4, muted: randomBool() },
      // fx
      { channel: 5, muted: randomBool() },
      // spel gtr 1
      { channel: 6, muted: randomBool() },
      // spel gtr 2
      { channel: 7, muted: randomBool() },
      // spel gtr 3
      { channel: 8, muted: randomBool() },
      // spel gtr 4
      { channel: 9, muted: randomBool() },
      // e-piano
      { channel: 10, muted: randomBool() },
      // bonanza bassline
      { channel: 11, muted: randomBool() }
    ],
    percussion: {
      pattern: randomInt(0, 6)
    },
    bonanza: {
      pulsarLevel: randomInt(0, 127),
      filter: randomInt(0, 90),
      filterEnv: randomInt(0, 127),
      lowCut: randomBool(),
      rateOneEighth: randomBool(),
      sawSolo: randomBool()
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
