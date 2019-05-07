const randomBool = () => {
  return Math.random() < 0.5;
};

const getRandomScene = () => {
  return {
    mixer: [
      { channel: 1, mute: randomBool() },
      { channel: 2, mute: randomBool() },
      { channel: 3, mute: randomBool() },
      { channel: 4, mute: randomBool() },
      { channel: 5, mute: randomBool() },
      { channel: 6, mute: randomBool() },
      { channel: 7, mute: randomBool() },
      { channel: 8, mute: randomBool() },
      { channel: 9, mute: randomBool() }
    ]
  };
};

const buildLoop = claps => ({
  scene: {
    current: getRandomScene()
  },
  stats: {
    claps
  }
});

module.exports = [
  buildLoop(4),
  buildLoop(2),
  buildLoop(1),
  buildLoop(2),
  buildLoop(0),
  buildLoop(0),
  buildLoop(4),
  buildLoop(12),
  buildLoop(8),
  buildLoop(19),
  buildLoop(2),
  buildLoop(2),
  buildLoop(10),
  buildLoop(2)
];
