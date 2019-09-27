const SceneBuilder = require("./SceneBuilder");

module.exports = class {
  #storage = null;

  constructor({ storage }) {
    this.#storage = storage;
    this.loop = {
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

  async updateScene(scene) {
    await this.#storage.saveLoop(this.loop);
    this.loop.scene.previous = this.loop.scene.current;
    this.loop.scene.current = scene;
    this.loop.stats.claps = 0;
    this.loop.stats.boos = 0;
  }
};
