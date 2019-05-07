const db = require('./db');

const loop = {
  scene: {
    current: {
      mixer: [
        { channel: 1, mute: true },
        { channel: 2, mute: true },
        { channel: 3, mute: true },
        { channel: 4, mute: true },
        { channel: 5, mute: true },
        { channel: 6, mute: true },
        { channel: 7, mute: true },
        { channel: 8, mute: true },
        { channel: 9, mute: true },
      ],
      percussion: {
        pattern: 0,
      },
    },
    previous: {
      mixer: [
        { channel: 1, mute: true },
        { channel: 2, mute: true },
        { channel: 3, mute: true },
        { channel: 4, mute: true },
        { channel: 5, mute: true },
        { channel: 6, mute: true },
        { channel: 7, mute: true },
        { channel: 8, mute: true },
        { channel: 9, mute: true },
      ],
      percussion: {
        pattern: 0,
      },
    },
  },
  stats: {
    claps: 0,
  },
};

const updateScene = async scene => {
  await db.db.collection('loops').insertOne({
    ...loop,
    _id: Date.now(),
  });
  loop.scene.previous = loop.scene.current;
  loop.scene.current = scene;
  loop.stats.claps = 0;
};

module.exports = {
  loop,
  updateScene,
};
