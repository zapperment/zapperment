const { average, minimum, maximum, sum } = require("./analyze");
const {
  normalizeValue,
  getNestedProperty,
  denormalizeValue
} = require("./utils");

module.exports = class {
  /* ----- PRIVATE FIELDS ----- */

  #properties = null;
  #data = null;

  /* ----- CONSTRUCTOR ----- */

  constructor(data) {
    this.#properties = {
      tempo: {
        type: "input",
        path: "scene.tempo",
        analyzer: v => v,
        min: minimum.value(data, "scene.tempo"),
        max: maximum.value(data, "scene.tempo")
      },
      barsPerLoop: {
        type: "input",
        path: "scene.barsPerLoop",
        analyzer: v => v,
        min: minimum.value(data, "scene.barsPerLoop"),
        max: maximum.value(data, "scene.barsPerLoop")
      },
      beatsPerBar: {
        type: "input",
        path: "scene.beatsPerBar",
        analyzer: v => v,
        min: minimum.value(data, "scene.beatsPerBar"),
        max: maximum.value(data, "scene.beatsPerBar")
      },
      pitchMin: {
        type: "input",
        path: "scene.channels",
        analyzer: v => minimum.value(v, "elements.pitch.min"),
        min: minimum.value(data, "scene.channels.elements.pitch.min"),
        max: maximum.value(data, "scene.channels.elements.pitch.min")
      },
      pitchMax: {
        type: "input",
        path: "scene.channels",
        analyzer: v => maximum.value(v, "elements.pitch.max"),
        min: minimum.value(data, "scene.channels.elements.pitch.max"),
        max: maximum.value(data, "scene.channels.elements.pitch.max")
      },
      avgVolume: {
        type: "input",
        path: "scene.channels",
        analyzer: v => average.value(v, "elements.volume"),
        min: minimum.value(data, "scene.channels.elements.volume"),
        max: maximum.value(data, "scene.channels.elements.volume")
      },
      totalVolume: {
        type: "input",
        path: "scene.channels",
        analyzer: v => sum.value(v, "elements.volume"),
        min: minimum.total(data, "scene.channels.elements.volume"),
        max: maximum.total(data, "scene.channels.elements.volume")
      },
      panLeft: {
        type: "input",
        path: "scene.channels",
        analyzer: v => minimum.value(v, "elements.pan.left"),
        min: minimum.value(data, "scene.channels.elements.pan.left"),
        max: maximum.value(data, "scene.channels.elements.pan.left")
      },
      panRight: {
        type: "input",
        path: "scene.channels",
        analyzer: v => minimum.value(v, "elements.pan.right"),
        min: minimum.value(data, "scene.channels.elements.pan.right"),
        max: maximum.value(data, "scene.channels.elements.pan.right")
      },
      avgBrightness: {
        type: "input",
        path: "scene.channels",
        analyzer: v => average.value(v, "elements.brightness"),
        min: minimum.value(data, "scene.channels.elements.brightness"),
        max: maximum.value(data, "scene.channels.elements.brightness")
      },
      totalBrightness: {
        type: "input",
        path: "scene.channels",
        analyzer: v => sum.value(v, "elements.brightness"),
        min: minimum.total(data, "scene.channels.elements.brightness"),
        max: maximum.total(data, "scene.channels.elements.brightness")
      },
      avgDecay: {
        type: "input",
        path: "scene.channels",
        analyzer: v => average.value(v, "elements.decay"),
        min: minimum.value(data, "scene.channels.elements.decay"),
        max: maximum.value(data, "scene.channels.elements.decay")
      },
      totalDecay: {
        type: "input",
        path: "scene.channels",
        analyzer: v => sum.value(v, "elements.decay"),
        min: minimum.total(data, "scene.channels.elements.decay"),
        max: maximum.total(data, "scene.channels.elements.decay")
      },
      channels: {
        type: "input",
        path: "scene.channels",
        analyzer: v => v.length,
        min: minimum.count(data, "scene.channels"),
        max: maximum.count(data, "scene.channels")
      },
      channelsPitched: {
        type: "input",
        path: "scene.channels",
        analyzer: v =>
          v.filter(({ elements: { pitch } }) => pitch !== null).length,
        min: minimum.count(data, "scene.channels.elements.pitch"),
        max: maximum.count(data, "scene.channels.elements.pitch")
      },
      channelsPercussive: {
        type: "input",
        path: "scene.channels",
        analyzer: v =>
          v.filter(({ elements: { pitch } }) => pitch === null).length,
        min: minimum.countNull(data, "scene.channels.elements.pitch"),
        max: maximum.countNull(data, "scene.channels.elements.pitch")
      },
      claps: {
        type: "output",
        path: "stats.claps",
        analyzer: v => v,
        min: minimum.value(data, "stats.claps"),
        max: maximum.value(data, "stats.claps")
      },
      boos: {
        type: "output",
        path: "stats.boos",
        analyzer: v => v,
        min: minimum.value(data, "stats.boos"),
        max: maximum.value(data, "stats.boos")
      }
    };

    Object.entries({
      effects: [
        "distortion",
        "reverb",
        "echo",
        "tremolo",
        "vibrato",
        "chorus",
        "unison",
        "flanger",
        "phaser",
        "vocoder",
        "gater",
        "filter",
        "sidechain",
        "pitchshift",
        "slap"
      ],
      timbre: [
        "acousticPiano",
        "electricPiano",
        "digitalElectricPiano",
        "harpsichord",
        "clavinet",
        "celesta",
        "glockenspiel",
        "musicBox",
        "vibraphone",
        "marimba",
        "xylophone",
        "tubularBells",
        "dulcimer",
        "rockOrgan",
        "churchOrgan",
        "accordion",
        "harmonica",
        "tangoAccordion",
        "nylonAcousticGuitar",
        "steelAcousticGuitar",
        "cleanElectricGuitar",
        "mutedElectricGuitar",
        "overdrivenGuitar",
        "guitarHarmonics",
        "guitarFretNoise",
        "acousticBass",
        "fingeredElectricBass",
        "pickedElectricBass",
        "fretlessBass",
        "slapBass",
        "bassFretNoise",
        "analogueSynthBass",
        "digitalSynthBass",
        "violin",
        "viola",
        "cello",
        "contrabass",
        "tremoloStrings",
        "pizzicatoStrings",
        "orchestralHarp",
        "timpani",
        "stringEnsemble",
        "synthStrings",
        "synthChoir",
        "orchestraHit",
        "femaleSoloVoice",
        "maleSoloVoice",
        "childSoloVoice",
        "falsettoVoice",
        "womensChoir",
        "mensChoir",
        "mixedChoir",
        "childrensChoir",
        "trumpet",
        "trombone",
        "tuba",
        "mutedTrumpet",
        "frenchHorn",
        "brassSection",
        "synthBrass",
        "sopranoSax",
        "altoSax",
        "tenorSax",
        "baritoneSax",
        "oboe",
        "englishHorn",
        "bassoon",
        "clarinet",
        "piccolo",
        "flute",
        "recorder",
        "panFlute",
        "blownBottle",
        "shakuhachi",
        "whistle",
        "ocarina",
        "squareLead",
        "sawtoothLead",
        "calliopeLead",
        "chiffLead",
        "charangLead",
        "voiceLead",
        "fifthLead",
        "newAgePad",
        "warmPad",
        "polysynthPad",
        "choirPad",
        "bowedPad",
        "metallicPad",
        "haloPad",
        "sweepPad",
        "sitar",
        "banjo",
        "shamisen",
        "koto",
        "kalimba",
        "bagpipe",
        "fiddle",
        "shanai",
        "tinkleBell",
        "steelDrums",
        "woodblock",
        "taikoDrum",
        "melodicTom",
        "synthDrum",
        "reverseCymbal",
        "voiceSample",
        "synthSoundEffect",
        "naturalSoundEffect",
        "noise",
        "bassDrum",
        "rimshot",
        "snareDrum",
        "handClap",
        "tomTom",
        "closedHiHat",
        "openHiHat",
        "crashCymbal",
        "rideCymbal",
        "rideBell",
        "splashCymbal",
        "tambourine",
        "cowbell",
        "vibraSlap",
        "bongo",
        "conga",
        "timbale",
        "agogo",
        "cabasa",
        "maracas",
        "guiro",
        "claves",
        "woodBlock",
        "cuica",
        "triangle",
        "snap",
        "click"
      ],
      sound: ["acoustic", "electric", "electronic"],
      type: [
        "melody",
        "solo",
        "chords",
        "arpeggio",
        "bassline",
        "hook",
        "riff",
        "rampUp",
        "rampDown",
        "fill",
        "hit",
        "break",
        "beat",
        "percussion"
      ],
      texture: ["monophonic", "polyphonic"],
      rhythm: ["groovy", "shuffled", "straight"],
      mood: [
        "aggressive",
        "agitated",
        "boring",
        "bright",
        "brutal",
        "busy",
        "cheesy",
        "cheerful",
        "confusing",
        "cool",
        "cute",
        "dark",
        "depressing",
        "dramatic",
        "energizing",
        "erotic",
        "euphoric",
        "exciting",
        "exotic",
        "funky",
        "funny",
        "gloomy",
        "happy",
        "heavy",
        "hypnotic",
        "light",
        "lively",
        "meditative",
        "melancholic",
        "melodramatic",
        "mysterious",
        "peaceful",
        "psychedelic",
        "quirky",
        "relaxed",
        "sad",
        "scary",
        "sentimental",
        "serene",
        "stressful",
        "sweet"
      ]
    }).forEach(([section, items]) => {
      items.forEach(item => {
        this.#properties[
          `${section}${item.replace(/^[a-z]/, m => m.toUpperCase())}`
        ] = {
          type: "input",
          path: "scene.channels",
          analyzer: v => sum.value(v, `elements.${section}.${item}`),
          min: minimum.total(
            data,
            `scene.channels.elements.${section}.${item}`
          ),
          max: maximum.total(data, `scene.channels.elements.${section}.${item}`)
        };
      });
    });
    this.#data = data;
  }

  /* ----- PUBLIC METHODS ----- */

  createTrainingData() {
    return this.#data.map(item => {
      const normalizedItem = { input: {}, output: {} };
      Object.entries(this.#properties).forEach(
        ([name, { type, path, analyzer, min, max }]) => {
          normalizedItem[type][name] = normalizeValue(
            analyzer(getNestedProperty(item, path)),
            min,
            max
          );
        }
      );
      return normalizedItem;
    });
  }

  normalizeScene(scene) {
    const normalizedScene = {};
    Object.entries(this.#properties)
      .filter(([, { type }]) => type === "input")
      .forEach(([name, { path, analyzer, min, max }]) => {
        normalizedScene[name] = normalizeValue(
          analyzer(getNestedProperty({ scene }, path)),
          min,
          max
        );
      });
    return normalizedScene;
  }

  denormalizeStats({ claps, boos }) {
    return {
      claps: denormalizeValue(
        claps,
        this.#properties.claps.min,
        this.#properties.claps.max
      ),
      boos: denormalizeValue(
        boos,
        this.#properties.boos.min,
        this.#properties.boos.max
      )
    };
  }
};
