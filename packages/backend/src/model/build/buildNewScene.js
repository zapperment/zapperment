const { normalizeScene } = require("../normalize");
const buildRandomScene = require("./buildRandomScene");
const { CONFIG_SCENE_QUALITY, MAX_ATTEMPTS } = require("../constants");
const { denormalizeScene } = require("../denormalize");

module.exports = trainedNet => {
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
