const maximum = require("./maximum");
const data = require('./testData');

describe("Given data that is an array of objects, where each object contains a scene with tracks, with a volume property on each track", () => {
  describe("maximum.value of scene.tracks.elements.volume", () => {
    it("returns the highest volume of any track of any scene", () => {
      // there are two tracks that have volume set to 127, which is the lowest
      expect(maximum.value(data, "scene.tracks.elements.volume")).toBe(127);
    });
  });

  describe("maximum.total of scene.tracks.elements.volume", () => {
    it("returns the highest sum of the volumes of all the tracks on scene", () => {
      // if you sum up the volume of tracks per scene, there is one scene where the total volume is 222,
      // which is the highest
      expect(maximum.total(data, "scene.tracks.elements.volume")).toBe(222);
    });
  });

  describe("maximum.count of scene.tracks", () => {
    it("returns the highest number of tracks of any scene", () => {
      // there is one scene that has three tracks, which is the most tracks any scene has
      expect(maximum.count(data, "scene.tracks")).toBe(3);
    });
  });

  describe("maximum.count of scene.tracks.elements.volume", () => {
    it("returns the highest number of tracks that have a volume of any scene", () => {
      // there are two scenes that have two tracks each which have a volume
      expect(maximum.count(data, "scene.tracks.elements.volume")).toBe(2);
    });
  });

  describe("maximum.countNull of scene.tracks.elements.volume", () => {
    it("returns the highest number of tracks where volume is set to null of any scene", () => {
      // there is one scene that has three tracks with volume set to null
      expect(maximum.countNull(data, "scene.tracks.elements.volume")).toBe(3);
    });
  });
});
