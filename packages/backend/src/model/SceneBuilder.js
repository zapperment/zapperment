const { trainNetwork } = require("./train");
const { loadTrack, buildRandomScene } = require("../track");
const { track } = require("../config");
// const { buildNewScene, buildRandomScene } = require("./build");
// const { denormalizeScene } = require("./denormalize");
// const { normalize } = require("./normalize");

module.exports = class {
  constructor({ storage }) {
    this.storage = storage;
    this.trainedNet = null;
    this.track = null;
  }

  async init() {
    const docs = await this.storage.loadLoops();
    if (docs.length) {
      this.trainedNet = trainNetwork(docs);
    }
    this.track = loadTrack(track);
    const {
      meta: { title, copyright }
    } = this.track;
    console.log(`Track loaded: “${title}”${copyright ? ` – ${copyright}` : ""}`);
  }

  buildRandomScene() {
    if (!this.track) {
      throw new Error("You need to call init before building a scene");
    }
    return buildRandomScene(this.track);
  }

  buildNewScene() {
    return this.trainedNet
      ? buildNewScene(this.trainedNet)
      : this.buildRandomScene();
  }

  // static buildRandomScene() {
  //   return buildRandomScene();
  // }

  // static denormalizeScene(normalizedScene) {
  //   return denormalizeScene(normalizedScene);
  // }

  // static normalize(rawData) {
  //   return normalize(rawData);
  // }
};
