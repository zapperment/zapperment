const brain = require("brain.js");
const db = require("../db");

const CONFIG_SCENE_QUALITY = 0.7;
const CONFIG_CHANNELS = 11;

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

const normalizeScene = ({ mixer }) => {
  return mixer.map(channel => (channel.muted ? 1 : 0));
};

const normalizeClaps = (claps, maxClaps) => {
  return claps / maxClaps;
};

const denormalizeScene = normalizedScene => {
  return {
    ...buildRandomScene(),
    mixer: normalizedScene.map((muteFloat, index) => ({
      channel: index + 1,
      muted: Boolean(muteFloat)
    }))
  };
};

const normalize = rawData => {
  const maxClaps = rawData.reduce((acc, loop) => {
    return Math.max(acc, loop.stats.claps);
  }, 0);

  return rawData
    .map(loop => {
      // protect from corrupted data
      if (!loop.scene.current || !loop.scene.current.mixer) {
        return null;
      }

      return {
        input: normalizeScene(loop.scene.current),
        output: [normalizeClaps(loop.stats.claps, maxClaps)]
      };
    })
    .filter(Boolean)
    .filter(({input}) => input.length === CONFIG_CHANNELS);
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
