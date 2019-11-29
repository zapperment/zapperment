const { getRandomBool } = require("./utils");
const track = require("../../tracks/hamburgInAutumn");

function isButton(controlName) {
  return controlName.startsWith("button");
}

function isRotary(controlName) {
  return controlName.startsWith("rotary");
}

function buildRandomScene() {
  return track.channels.map(({ name, elements, midi, controls }) => {
    console.log("[PH_LOG] channel name:", name); // PH_TODO
    const scene = {
      midi: {
        ...midi,
        events: []
      },
      elements
    };
    Object.entries(controls).forEach(([controlName, { target, on, off }]) => {
      console.log("[PH_LOG] name:", controlName); // PH_TODO
      console.log("[PH_LOG] is button?", isButton(controlName)); // PH_TODO
      if (isButton(controlName)) {
        const isOn = getRandomBool();
        const value = isOn ? 127 : 0;
        scene.midi.events.push([{
          // TODO add MIDI controller events here for combinator
        }]);
        // TODO: iterate values of controls and change scene elements accordingly
      }
    });
    return scene;
  });
}

module.exports = buildRandomScene;

const scene = buildRandomScene();
console.log(`[PH_LOG] scene\n${JSON.stringify(scene, null, 4)}`); // PH_TODO

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
