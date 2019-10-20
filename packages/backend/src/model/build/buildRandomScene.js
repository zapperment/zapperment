const { getRandomBool, getRandomInt } = require("./utils");

module.exports = () => ({
  mixer: [
    // piano
    { channel: 1, muted: getRandomBool() },
    // bottle perc
    { channel: 2, muted: getRandomBool() },
    // dirty beat
    { channel: 3, muted: getRandomBool() },
    // fuzz bass
    { channel: 4, muted: getRandomBool() },
    // fm arp
    { channel: 5, muted: getRandomBool() },
    // spel gtr 1
    { channel: 6, muted: getRandomBool() },
    // spel gtr 2
    { channel: 7, muted: getRandomBool() },
    // spel gtr 3
    { channel: 8, muted: getRandomBool() },
    // spel gtr 4
    { channel: 9, muted: getRandomBool() },
    // e-piano
    { channel: 10, muted: getRandomBool() },
    // bonanza bassline
    { channel: 11, muted: getRandomBool() }
  ],
  percussion: {
    pattern: getRandomInt(0, 6)
  },
  bonanza: {
    pulsarLevel: getRandomInt(0, 127),
    filter: getRandomInt(0, 90),
    filterEnv: getRandomInt(0, 127),
    lowCut: getRandomBool(),
    rateOneEighth: getRandomBool(),
    sawSolo: getRandomBool()
  }
});
