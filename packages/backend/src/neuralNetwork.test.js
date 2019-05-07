const { normalize, denormalizeScene } = require("./neuralNetwork");

const scene = {
  mixer: [
    { channel: 1, mute: false },
    { channel: 2, mute: true },
    { channel: 3, mute: false },
    { channel: 4, mute: true },
    { channel: 5, mute: false },
    { channel: 6, mute: true },
    { channel: 7, mute: false },
    { channel: 8, mute: true },
    { channel: 9, mute: false }
  ]
};

describe("neural network", () => {
  it("should normalize data", () => {
    const rawData = [
      {
        scene: {
          current: scene
        },
        stats: {
          claps: 4
        }
      },
      {
        scene: {
          current: scene
        },
        stats: {
          claps: 8
        }
      }
    ];

    expect(normalize(rawData)).toEqual([
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0], output: [0.5] },
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0], output: [1] }
    ]);
  });

  it("should limit claps to 10", () => {
    const rawData = [
      {
        scene: {
          current: scene
        },
        stats: {
          claps: 123
        }
      }
    ];

    expect(normalize(rawData)).toEqual([
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0], output: [1] }
    ]);
  });

  it("should denormalize scene", () => {
    expect(denormalizeScene([0, 1, 0, 1, 0, 1, 0, 1, 0])).toEqual(scene);
  });
});
