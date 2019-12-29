const { trainNetwork } = require("./train");
const { loadTrack, buildRandomScene } = require("../track");
const { track, sceneQuality, maxAttempts } = require("../config");
const { Normalizer } = require("./normalize");

module.exports = class {
  constructor({ storage }) {
    this.storage = storage;
    this.trainedNet = null;
    this.track = null;
    this.normalizer = null;
  }

  async init() {
    this.track = loadTrack(track);
    const {
      meta: { title, copyright }
    } = this.track;
    console.log(
      `Track loaded: “${title}”${copyright ? ` – ${copyright}` : ""}`
    );
    const docs = await this.storage.loadLoops();
    if (docs.length) {
      this.normalizer = new Normalizer(docs);
      this.trainedNet = trainNetwork(this.normalizer.createTrainingData());
    }
  }

  buildRandomScene() {
    if (!this.track) {
      throw new Error("You need to call init before building a scene");
    }
    return buildRandomScene(this.track);
  }

  buildNewScene() {
    if (!this.track) {
      throw new Error("You need to call init before building a scene");
    }
    if (!this.trainedNet) {
      return this.buildRandomScene();
    }

    let scene;
    let midiCommands;
    let output;
    let attempts = 0;

    do {
      ({ scene, midiCommands } = buildRandomScene(this.track));
      output = this.trainedNet(this.normalizer.normalizeScene(scene));
    } while (
      output.claps - output.boos < sceneQuality &&
      ++attempts < maxAttempts
    );

    const { claps, boos } = this.normalizer.denormalizeStats(output);

    console.log(
      `NEW SCENE PREDICTION:\n${claps.toFixed(0)} claps, ${boos.toFixed(
        0
      )} boos (${attempts} attempts)`
    );
    return { scene, midiCommands };
  }
};
