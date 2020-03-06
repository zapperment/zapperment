const { loadComposition, buildRandomScene } = require("../composition");
const { composition, sceneQuality, maxAttempts } = require("../config");
const { Normalizer, trainNetwork } = require("@zapperment/model");

module.exports = class {
  /* ----- PRIVATE FIELDS ----- */

  #storage = null;
  #trainedNet = null;
  #composition = null;
  #normalizer = null;
  #useNeuralNetwork = false;

  /* ----- CONSTRUCTOR ----- */

  constructor({ storage, useNeuralNetwork }) {
    this.#storage = storage;
    this.#trainedNet = null;
    this.#composition = null;
    this.#normalizer = null;
    this.#useNeuralNetwork = useNeuralNetwork;
  }

  /* ----- PUBLIC METHODS ----- */

  async init() {
    this.#composition = loadComposition(composition);
    const {
      meta: { title, copyright }
    } = this.#composition;
    console.log(
      `Composition loaded: “${title}”${copyright ? ` – ${copyright}` : ""}`
    );
    if (this.#useNeuralNetwork) {
      const docs = await this.#storage.loadLoops();
      if (docs.length) {
        this.#normalizer = new Normalizer(docs);
        this.#trainedNet = trainNetwork(this.#normalizer.createTrainingData());
      }
    } else {
      console.log("Neural network has been disabled, building random scenes");
    }
  }

  buildRandomScene() {
    if (!this.#composition) {
      throw new Error("You need to call init before building a scene");
    }
    return buildRandomScene(this.#composition);
  }

  buildNewScene() {
    if (!this.#composition) {
      throw new Error("You need to call init before building a scene");
    }
    if (!this.#trainedNet) {
      return this.buildRandomScene();
    }

    let scene;
    let commands;
    let output;
    let attempts = 0;

    do {
      ({ scene, commands } = buildRandomScene(this.#composition));
      output = this.#trainedNet(this.#normalizer.normalizeScene(scene));
    } while (
      ++attempts < maxAttempts &&
      output.claps - output.boos < sceneQuality
    );

    const { claps, boos } = this.#normalizer.denormalizeStats(output);
    const prettyClaps = claps.toFixed(0);
    const prettyBoos = boos.toFixed(0);

    console.log(
      `NEW SCENE PREDICTION:\n${prettyClaps} clap${
        prettyClaps === "1" ? "" : "s"
      }, ${prettyBoos} boo${
        prettyBoos === "1" ? "" : "s"
      } (${attempts} attempt${attempts === 1 ? "" : "s"})`
    );
    return { scene, commands };
  }
};
