const { denormalizeScene } = require("./denormalize");
const trainNetwork = require("./trainNetwork");
const {
  buildRandomScene,
  buildNewScene: buildNewSceneFunc
} = require("./build");

let trainedNet;

const initSceneGeneration = storage =>
  storage.db
    .collection("loops")
    .find({})
    .toArray((err, docs) => {
      trainedNet = trainNetwork(docs);
    });

function buildNewScene() {
  return buildNewSceneFunc(trainedNet);
}

module.exports = {
  denormalizeScene,
  buildRandomScene,
  buildNewScene,
  initSceneGeneration
};
