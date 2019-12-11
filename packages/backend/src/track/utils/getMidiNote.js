const noteValue = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11
};

module.exports = value => {
  const [, noteName, octave] = value.match(/^([A-G]#?)(-*[0-9])$/);
  return (parseInt(octave, 10) + 2) * 12 + noteValue[noteName];
};
