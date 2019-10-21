const { getRandomBool } = require("./utils");

module.exports = () => ({
  mixer: buildMixer(),
  nervomat: {
    annoyMe: getRandomBool()
  }
});

function buildMixer() {
  let mixer;
  do {
    mixer = [
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
    ];
  } while (allChannelsMuted(mixer));
  return mixer;
}

function allChannelsMuted(mixer) {
  return mixer.reduce(
    (allMuted, { muted }) => (!allMuted ? allMuted : muted),
    true
  );
}

