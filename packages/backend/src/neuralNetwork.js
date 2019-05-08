const brain = require("brain.js");
const db = require("./db");

const CONFIG_SCENE_QUALITY = 0.7;

const normalizeScene = ({ mixer }) => {
  return mixer.map(channel => (channel.mute ? 1 : 0));
};

const normalizeClaps = (claps, maxClaps) => {
  return claps / maxClaps;
};

const denormalizeScene = normalizedScene => {
  return {
    mixer: normalizedScene.map((muteFloat, index) => ({
      channel: index + 1,
      mute: Boolean(muteFloat)
    }))
  };
};

const normalize = rawData => {
  const maxClaps = rawData.reduce((acc, loop) => {
    return Math.max(acc, loop.stats.claps);
  }, 0);

  return rawData.map(loop => ({
    input: normalizeScene(loop.scene.current),
    output: [normalizeClaps(loop.stats.claps, maxClaps)]
  }));
};

const randomBool = () => {
  return Math.random() < 0.5;
};

const getRandomScene = () => {
  return {
    mixer: [
      { channel: 1, mute: randomBool() },
      { channel: 2, mute: randomBool() },
      { channel: 3, mute: randomBool() },
      { channel: 4, mute: randomBool() },
      { channel: 5, mute: randomBool() },
      { channel: 6, mute: randomBool() },
      { channel: 7, mute: randomBool() },
      { channel: 8, mute: randomBool() },
      { channel: 9, mute: randomBool() }
    ]
  };
};

const train = data => {
  const net = new brain.NeuralNetwork();
  const normalizedData = normalize(data);
  net.train(normalizedData);
  return net.toFunction();
};

const buildNewScene = trainedNet => {
  let output;
  let input = [];

  do {
    input = normalizeScene(getRandomScene());
    output = trainedNet(input);
  } while (output < CONFIG_SCENE_QUALITY);

  return denormalizeScene(input);
};

// use it like:
// db.init(() => {
//   db.db
//     .collection("loops")
//     .find({})
//     .toArray(function(err, docs) {
//       const trainedNet = train(docs);
//       const newScene = buildNewScene(trainedNet);
//       console.log(newScene);
//     });
// });

module.exports = {
  normalize,
  denormalizeScene
};
