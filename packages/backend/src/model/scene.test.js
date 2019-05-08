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
  ],
  percussion: {
    pattern: 3
  },
  bonanza: {
    pulsarLevel: 74,
    filter: 84,
    filterEnv: 19,
    lowCut: true,
    rateOneEighth: true,
    sawSolo: false
  }
};

const expectedInput = {
  mix_01: 0,
  mix_02: 1,
  mix_03: 0,
  mix_04: 1,
  mix_05: 0,
  mix_06: 1,
  mix_07: 0,
  mix_08: 1,
  mix_09: 0,
  mix_10: 1,
  mix_11: 0,
  bon_filter: 0.9333333333333333,
  bon_filterEnv: 0.14960629921259844,
  bon_lowCut: 1,
  per_pattern: 0.5,
  bon_pulsarLevel: 0.5826771653543307,
  bon_rateOneEighth: 1,
  bon_sawSolo: 0
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
      }
    ];

    expect(normalize(rawData)).toEqual([
      {
        input: expectedInput,
        output: [1]
      }
    ]);
  });

  it("should normalize claps", () => {
    const rawData = [
      {
        scene: {
          current: scene
        },
        stats: {
          claps: 20
        }
      },
      {
        scene: {
          current: scene
        },
        stats: {
          claps: 10
        }
      }
    ];

    expect(normalize(rawData)).toEqual([
      { input: expectedInput, output: [1] },
      { input: expectedInput, output: [0.5] }
    ]);
  });

  it("should denormalize scene", () => {
    expect(denormalizeScene(expectedInput)).toMatchObject(
      scene
    );
  });
});
