const { normalize, denormalizeScene } = require("./scene");

const scene = {
  mixer: [
    { channel: 1, muted: false },
    { channel: 2, muted: true },
    { channel: 3, muted: false },
    { channel: 4, muted: true },
    { channel: 5, muted: false },
    { channel: 6, muted: true },
    { channel: 7, muted: false },
    { channel: 8, muted: true },
    { channel: 9, muted: false },
    { channel: 10, muted: true },
    { channel: 11, muted: false }
  ]
};

describe("scene model", () => {
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
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], output: [0.5] },
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], output: [1] }
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
      { input: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], output: [1] }
    ]);
  });

  it("should denormalize scene", () => {
    expect(denormalizeScene([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0])).toMatchObject(scene);
  });
});
