const { normalizeScene } = require("../normalize");
const buildRandomScene = require("./buildRandomScene");
const { sceneQuality, maxAttempts } = require("../../config");
const { denormalizeScene } = require("../denormalize");

module.exports = trainedNet => {
  let output;
  let input = [];
  let attempts = 0;

  do {
    input = normalizeScene(buildRandomScene());
    output = trainedNet(input);
  } while (output < sceneQuality && ++attempts < maxAttempts);

  console.log(`NEW SCENE PREDICTION: ${output} (${attempts} attempts)`);

  return denormalizeScene(input);
};
