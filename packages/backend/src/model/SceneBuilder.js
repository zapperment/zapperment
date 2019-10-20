const { trainNetwork } = require("./train");
const { buildNewScene, buildRandomScene } = require("./build");
const { denormalizeScene } = require("./denormalize");
const { normalize } = require("./normalize");

module.exports = class {
  constructor({ storage }) {
    this.storage = storage;
    this.trainedNet = null;
  }

  async init() {
    const docs = await this.storage.loadLoops();
    if (docs.length) {
      this.trainedNet = trainNetwork(docs);
    }
  }

  buildNewScene() {
    return this.trainedNet
      ? buildNewScene(this.trainedNet)
      : buildRandomScene();
  }

  static buildRandomScene() {
    return buildRandomScene();
  }

  static denormalizeScene(normalizedScene) {
    return denormalizeScene(normalizedScene);
  }

  static normalize(rawData) {
    return normalize(rawData);
  }
};
