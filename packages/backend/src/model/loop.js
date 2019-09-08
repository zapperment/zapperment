const { buildRandomScene } = require("./scene");

const loop = {
  scene: {
    current: buildRandomScene(),
    previous: {}
  },
  stats: {
    claps: 0,
    boos: 0
  }
};

const updateScene = async (storage, scene) => {
  await storage.db.collection("loops").insertOne({
    ...loop,
    _id: Date.now()
  });
  loop.scene.previous = loop.scene.current;
  loop.scene.current = scene;
  loop.stats.claps = 0;
  loop.stats.boos = 0;
};

module.exports = {
  loop,
  updateScene
};
