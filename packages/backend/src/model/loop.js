const { buildRandomScene } = require("./scene");
const db = require("../db");

const loop = {
  scene: {
    current: buildRandomScene(),
    previous: {}
  },
  stats: {
    claps: 0
  }
};

const updateScene = async scene => {
  await db.db.collection("loops").insertOne({
    ...loop,
    _id: Date.now()
  });
  loop.scene.previous = loop.scene.current;
  loop.scene.current = scene;
  loop.stats.claps = 0;
};

module.exports = {
  loop,
  updateScene
};
