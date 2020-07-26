const minimum = require("./minimum");
const data = require("./testData");

describe("Given data that is an array of objects, where each object contains a scene with tracks, with a “volume” property on each track", () => {
  describe("minimum.value of scene.tracks.elements.volume", () => {
    it("returns the lowest volume of any track of any scene", () => {
      // there is one track that has volume set to 31, which is the lowest
      expect(minimum.value(data, "scene.tracks.elements.volume")).toBe(31);
    });
  });

  describe("minimum.total of scene.tracks.elements.volume", () => {
    it("returns the lowest sum of the volumes of all the tracks on scene", () => {
      // if you sum up the volume of tracks per scene, there is one scene where the total volume is 94,
      // which is the lowest
      expect(minimum.total(data, "scene.tracks.elements.volume")).toBe(94);
    });
  });

  describe("minimum.count of scene.tracks", () => {
    it("returns the lowest number of tracks of any scene", () => {
      // there is one scene that doesn't have any tracks at all
      expect(minimum.count(data, "scene.tracks")).toBe(0);
    });
  });

  describe("minimum.count of scene.tracks.elements.volume", () => {
    it("returns the lowest number of tracks that have a volume of any scene", () => {
      // there are two scenes that have only one track each which have a volume
      expect(minimum.count(data, "scene.tracks.elements.volume")).toBe(1);
    });
  });

  describe("minimum.countNull of scene.tracks.elements.volume", () => {
    it("returns the lowest number of tracks where volume is set to null of any scene", () => {
      // there is one scene that has three tracks with volume set to null
      expect(minimum.countNull(data, "scene.tracks.elements.volume")).toBe(3);
    });
  });
});
