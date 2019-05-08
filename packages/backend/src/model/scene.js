const brain = require("brain.js");
const db = require("../db");

const CONFIG_SCENE_QUALITY = 0.7;
const CONFIG_CHANNELS = 11;

const PREFIX_MIXER = "mix";
const PREFIX_PERCUSSION = "per";
const PREFIX_BONANZA = "bon";

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

const normalizeNumber = (value, max) => {
  return value / max;
};

const denormalizeNumber = (value, max) => {
  return Math.floor(value * max);
};

const normalizeMixer = mixer =>
  mixer.reduce(
    (acc, channel) => ({
      ...acc,
      [`${PREFIX_MIXER}_${("" + channel.channel).padStart(
        2,
        "0"
      )}`]: channel.muted ? 1 : 0
    }),
    {}
  );

const normalizePercussion = percussion => ({
  [`${PREFIX_PERCUSSION}_pattern`]: normalizeNumber(percussion.pattern, 6)
});

const normalizeBonanza = bonanza => ({
  [`${PREFIX_BONANZA}_pulsarLevel`]: normalizeNumber(bonanza.pulsarLevel, 127),
  [`${PREFIX_BONANZA}_filter`]: normalizeNumber(bonanza.filter, 90),
  [`${PREFIX_BONANZA}_filterEnv`]: normalizeNumber(bonanza.filterEnv, 127),
  [`${PREFIX_BONANZA}_lowCut`]: bonanza.lowCut ? 1 : 0,
  [`${PREFIX_BONANZA}_rateOneEighth`]: bonanza.rateOneEighth ? 1 : 0,
  [`${PREFIX_BONANZA}_sawSolo`]: bonanza.sawSolo ? 1 : 0
});

const normalizeScene = ({ mixer, percussion, bonanza }) => {
  return {
    ...normalizeMixer(mixer),
    ...normalizePercussion(percussion),
    ...normalizeBonanza(bonanza)
  };
};

const normalizeClaps = (claps, maxClaps) => {
  return claps / maxClaps;
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

const normalize = rawData => {
  const maxClaps = rawData.reduce((acc, loop) => {
    return Math.max(acc, loop.stats.claps);
  }, 0);

  return rawData
    .map(loop => {
      // protect from corrupted data
      if (
        !loop.scene.current ||
        !loop.scene.current.mixer ||
        loop.scene.current.mixer.length !== CONFIG_CHANNELS
      ) {
        return null;
      }

      return {
        input: normalizeScene(loop.scene.current),
        output: [normalizeClaps(loop.stats.claps, maxClaps)]
      };
    })
    .filter(Boolean);
};

const trainNetwork = data => {
  const net = new brain.NeuralNetwork();
  const normalizedData = normalize(data);
  net.train(normalizedData);
  console.log(`NEURAL NETWORK TRAINED WITH ${normalizedData.length} LOOPS`);
  return net.toFunction();
};

const initSceneGeneration = () => {
  db.init(() => {
    db.db
      .collection("loops")
      .find({})
      .toArray(function(err, docs) {
        trainedNet = trainNetwork(docs);
      });
  });
};

const buildNewScene = () => {
  let output;
  let input = [];

  do {
    input = normalizeScene(buildRandomScene());
    output = trainedNet(input);
  } while (output < CONFIG_SCENE_QUALITY);

  console.log(`NEW SCENE PREDICTION: ${output}`);

  return denormalizeScene(input);
};

module.exports = {
  normalize,
  denormalizeScene,
  buildRandomScene,
  buildNewScene,
  initSceneGeneration
};
