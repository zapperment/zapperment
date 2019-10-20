const { getRandomBool } = require("./utils");

module.exports = () => ({
  mixer: [
    // 102 piano
    { channel: 1, muted: getRandomBool() },
    // 103 bottle perc
    { channel: 2, muted: getRandomBool() },
    // 104 dirty beat
    { channel: 3, muted: getRandomBool() },
    // 105 fuzz bass
    { channel: 4, muted: getRandomBool() },
    // 106 fm arp
    { channel: 5, muted: getRandomBool() }
  ],
  nervomat: {
    annoyMe: getRandomBool()
  }
});
