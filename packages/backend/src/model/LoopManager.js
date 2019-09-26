const SceneBuilder = require("./SceneBuilder");

module.exports = class {
  constructor({ storage }) {
    this.storage = storage;
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
    await this.storage.db.collection("loops").insertOne({
      ...loop,
      _id: Date.now()
    });
    loop.scene.previous = loop.scene.current;
    loop.scene.current = scene;
    loop.stats.claps = 0;
    loop.stats.boos = 0;
  }
};
