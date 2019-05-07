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
    },
  },
  stats: {
    claps: 0,
  },
};

const updateScene = async scene => {
  console.log('NEW SCENE')
  const { db } = require('./db');
  await db.collection('loops').insertOne(loop);

  loop.scene.previous = loop.scene.current;
  loop.scene.current = scene;
};

module.exports = {
  loop,
  updateScene,
};
