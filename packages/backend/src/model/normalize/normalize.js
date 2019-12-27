const { getNestedMaximum } = require("./utils");
module.exports = data => {
  const maxClaps = getNestedMaximum(data, 'stats.claps');
  const maxBoos = getNestedMaximum(data, 'stats.boos');
  const maxChannels = data.reduce(
    (acc, { scene: { channels } }) => Math.max(acc, channels.length),
    0
  );
  const maxTotalVolume = getNestedMaximum(data, 'scene.channels.elements.volume');
  maxClaps; //?
  maxBoos; //?
  maxChannels; //?
  maxTotalVolume; //?
  const normalizedData = {};
};

const data = [
  {
    scene: {
      channels: [
        {
          elements: {
            volume: 31
          }
        },
        {
          elements: { volume: 50 }
        }
      ]
    },
    stats: { claps: 5, boos: 0 }
  },
  {
    scene: {
      channels: [
        {
          elements: {
            volume: 10
          }
        }
      ]
    },
    stats: { claps: 10, boos: 5 }
  }
];

module.exports(data);
