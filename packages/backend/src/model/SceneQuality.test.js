const SceneQuality = require("./SceneQuality");

describe("When I configure a scene quality to start with a hit", () => {
  describe("the resulting scene quality", () => {
    let sceneQuality;
    beforeAll(() => (sceneQuality = new SceneQuality({ startingWithHit: 1 })));
    it("starts with a hit", () => {
      expect(sceneQuality.startingWithHit).toBeTruthy();
    });
    it("is immutable", () => {
      sceneQuality.startingWithHit = 666;
      expect(sceneQuality.startingWithHit).toEqual(1);
    });
  });
});
