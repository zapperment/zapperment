module.exports = [
  // 2 tracks
  // average volume: 47
  // total volume: 94
  {
    scene: {
      tracks: [{ elements: { volume: 31 } }, { elements: { volume: 63 } }]
    }
  },
  // 2 tracks
  // average volume: 111
  // total volume: 222
  {
    scene: {
      tracks: [{ elements: { volume: 95 } }, { elements: { volume: 127 } }]
    }
  },
  // 1 track
  // average volume: 95
  // total volume: 95
  {
    scene: {
      tracks: [{ elements: { volume: 95 } }]
    }
  },
  // 1 track
  // average volume: 127
  // total volume: 127
  {
    scene: {
      tracks: [{ elements: { volume: 127 } }]
    }
  },
  // 3 tracks
  // no average volume
  // no total volume
  {
    scene: {
      tracks: [
        { elements: { volume: null } },
        { elements: { volume: null } },
        { elements: { volume: null } },
        { elements: null }
      ]
    }
  },
  // 0 tracks
  // no average volume
  // no total volume
  {
    scene: {
      tracks: []
    }
  }
];
