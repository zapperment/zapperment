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
    this.trainedNet = trainNetwork(docs)
  }

  buildNewScene() {
    return buildNewScene(this.trainedNet);
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
