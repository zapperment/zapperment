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

/* ----- CONSTANTS ----- */

const feedbackTypeBoos = "boos";
const feedbackTypeClaps = "claps";

/* ----- CLASS EXPORT ----- */

module.exports = class {
  /* ----- PRIVATE FIELDS ----- */

  #storage = null;
  #loop = null;

  /* ----- CONSTRUCTOR ----- */

  constructor({ storage }) {
    this.#storage = storage;
    this.#loop = {
      scene: {},
      stats: {
        claps: 0,
        boos: 0
      }
    };
  }

  /* ----- PUBLIC METHODS ----- */

  init(scene) {
    this.#loop.scene = scene;
  }

  processBoo() {
    this.#processFeedback(feedbackTypeBoos);
  }

  processClap() {
    this.#processFeedback(feedbackTypeClaps);
  }

  async updateScene(scene) {
    if (this.hasFeedback) {
      await this.#storage.saveLoop(this.#loop);
    }
    this.#loop.scene = scene;
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

  get hasFeedback() {
    return this.boos || this.claps;
  }

  /* ----- PRIVATE METHODS ----- */

  #processFeedback = type => this.#loop.stats[type]++;
  #getFeedback = type => this.#loop.stats[type];
};
