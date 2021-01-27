const average = require("./average");
const data = require('./testData');

describe("Given data that is an array of objects, where each object contains a scene with tracks, with a volume property on each track", () => {
  describe("average.value of scene.tracks.elements.volume", () => {
    it("returns the average volume of all track of all scenes", () => {
      // there are six tracks that have a volume set, the average of which is 89.6
      // (total of 538 divided by 6)
      expect(average.value(data, "scene.tracks.elements.volume")).toBe(89.666666666666667);
    });
  });

  describe("average.total of scene.tracks.elements.volume", () => {
    it("returns the highest sum of the volumes of all the tracks on scene", () => {
      // if you sum up the volume of tracks per scene, there is one scene where the total volume is 222,
      // which is the highest
      expect(average.total(data, "scene.tracks.elements.volume")).toBe(222);
    });
  });

  describe("average.count of scene.tracks", () => {
    it("returns the average number of tracks of all scenes", () => {
      // there are 6 scenes with an average of 1.5 tracks
      // (total of 9 divided by 6)
      expect(average.count(data, "scene.tracks")).toBe(1.5);
    });
  });

  describe("average.count of scene.tracks.elements.volume", () => {
    it("returns the average number of tracks that have a volume of all scenes", () => {
      // there are 6 scenes with an average of 1 track that has a volume
      // (total of 6 divided by 6)
      expect(average.count(data, "scene.tracks.elements.volume")).toBe(1);
    });
  });

  describe("average.countNull of scene.tracks.elements.volume", () => {
    it("returns the average number of tracks where volume is set to null of all scenes", () => {
      // there are 6 scenes with an average of 0.5 tracks that have null volume
      // (total of 3 divided by 6)
      expect(average.countNull(data, "scene.tracks.elements.volume")).toBe(0.5);
    });
  });
});
