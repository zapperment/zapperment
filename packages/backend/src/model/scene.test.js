const { mockRandom } = require("jest-mock-random");
const { buildDefaultScene, buildNewScene } = require("./scene");

const defaultScene = {
  mixer: [
    { id: 0, mute: false },
    { id: 1, mute: true },
    { id: 2, mute: false },
    { id: 3, mute: true },
    { id: 4, mute: false },
    { id: 5, mute: true },
    { id: 6, mute: false },
    { id: 7, mute: true },
    { id: 8, mute: false }
  ]
};

describe("scene model", () => {
  it("should build default scene object", () => {
    expect(buildDefaultScene()).toEqual(defaultScene);
  });

  it("should build new scene based on previous one", () => {
    mockRandom([0.1, 0.3]);
    expect(buildNewScene(defaultScene)).toEqual({
      mixer: [
        { id: 0, mute: true },
        { id: 1, mute: true },
        { id: 2, mute: true },
        { id: 3, mute: true },
        { id: 4, mute: false },
        { id: 5, mute: true },
        { id: 6, mute: false },
        { id: 7, mute: true },
        { id: 8, mute: false }
      ]
    });
  });
});
