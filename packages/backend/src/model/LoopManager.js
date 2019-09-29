/**
 * LoopManager
 *
 * Stores information about the currently running loop:
 * - which MIDI parameter settings are currently active,
 *   i.e. which scene is currently set
 * - what the current user feedback for the loop is,
 *   i.e. how many times the users clicked the “clap” and “boo” buttons
 *
 * Provides a method to update the scene, which stores the current scene
 * and creates a new one.
 */
const SceneBuilder = require("./SceneBuilder");

/* ----- CONSTANTS ----- */

const feedbackTypeBoos = 'boos';
const feedbackTypeClaps = 'claps';

module.exports = class {

  /* ----- PRIVATE FIELDS ----- */

  #storage = null;
  #loop = null;

  /* ----- CONSTRUCTOR ----- */

  constructor({ storage }) {
    this.#storage = storage;
    this.#loop = {
      scene: {
        current: SceneBuilder.buildRandomScene(),
        previous: {}
      },
      stats: {
        claps: 0,
        boos: 0
      }
    };
  }

  /* ----- PUBLIC METHODS ----- */

  processBoo() {
    this.#processFeedback(feedbackTypeBoos);
  }

  processClap() {
    this.#processFeedback(feedbackTypeClaps);
  }

  async updateScene(scene) {
    await this.#storage.saveLoop(this.#loop);
    this.#loop.scene.previous = this.#loop.scene.current;
    this.#loop.scene.current = scene;
    this.#loop.stats.claps = 0;
    this.#loop.stats.boos = 0;
  }

  /* ----- GETTERS AND SETTERS ----- */

  get boos() {
    return this.#getFeedback(feedbackTypeBoos);
  }

  get claps() {
    return this.#getFeedback(feedbackTypeClaps);
  }

  /* ----- PRIVATE METHODS ----- */

  #processFeedback = type => this.#loop.stats[type]++;
  #getFeedback = type => this.#loop.stats[type];
};
