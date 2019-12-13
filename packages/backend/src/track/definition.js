const {
  required,
  optional,
  string,
  float,
  integer,
  oneOf,
  controllable,
  boolean,
  note
} = require("./utils");

module.exports = {
  meta: required({
    title: required(string),
    description: optional(string),
    artists: optional([
      {
        name: required(string),
        role: optional(string, "Producer"),
        url: optional(string)
      }
    ]),
    link: optional({
      url: required(string),
      text: required(string)
    }),
    copyright: optional(string),
    license: optional(string, "Creative Commons Attribution 4.0 International")
  }),
  tempo: required(float(1, 999)),
  barsPerLoop: optional(integer(1, 999), 4),
  beatsPerBar: optional(integer(1, 16), 4),
  channels: required([
    {
      meta: required({
        name: required(string),
        description: optional(string),
        color: optional(
          oneOf(
            "burgundy",
            "red",
            "orange",
            "brown",
            "ochre",
            "peach",
            "wheat",
            "tangerine",
            "pineapple",
            "lemon",
            "brightLime",
            "lightOlive",
            "mossGreen",
            "kellyGreen",
            "asparagus",
            "darkGreen",
            "camouflageGreen",
            "turquoise",
            "blueInGreen",
            "powderBlue",
            "lightBlue",
            "skyBlue",
            "steelBlue",
            "slateBlue",
            "darkBlue",
            "pink",
            "lilac",
            "plum",
            "neonViolet",
            "deepPurple",
            "graphite",
            "brightGrey"
          )
        )
      }),
      midi: required({
        channel: required(integer(1, 16)),
        bus: optional(oneOf("A", "B", "C", "D"), "A")
      }),
      playing: controllable(optional(boolean, true)),
      elements: required({
        pitch: controllable(
          optional({
            min: controllable(optional(note, "C-2")),
            max: controllable(optional(note, "G8"))
          })
        ),
        volume: controllable(optional(integer(0, 127), 95)),
        pan: controllable(
          optional(
            {
              left: controllable(optional(integer(0, 127), 64)),
              right: controllable(optional(integer(0, 127), 64))
            },
            {
              left: 64,
              right: 64
            }
          )
        ),
        brightness: controllable(optional(integer(0, 127), 95)),
        decay: controllable(optional(integer(0, 127), 63)),
        effects: controllable(
          optional(
            {
              distortion: controllable(optional(integer(0, 127), 0)),
              reverb: controllable(optional(integer(0, 127), 0)),
              echo: controllable(optional(integer(0, 127), 0)),
              tremolo: controllable(optional(integer(0, 127), 0)),
              vibrato: controllable(optional(integer(0, 127), 0)),
              chorus: controllable(optional(integer(0, 127), 0)),
              unison: controllable(optional(integer(0, 127), 0)),
              flanger: controllable(optional(integer(0, 127), 0)),
              phaser: controllable(optional(integer(0, 127), 0)),
              vocoder: controllable(optional(integer(0, 127), 0)),
              gater: controllable(optional(integer(0, 127), 0)),
              filter: controllable(optional(integer(0, 127), 0)),
              sidechain: controllable(optional(integer(0, 127), 0)),
              pitchshift: controllable(optional(integer(0, 127), 0)),
              slap: controllable(optional(integer(0, 127), 0))
            },
            {
              distortion: 0,
              reverb: 0,
              echo: 0,
              tremolo: 0,
              vibrato: 0,
              chorus: 0,
              unison: 0,
              flanger: 0,
              phaser: 0,
              vocoder: 0,
              gater: 0,
              filter: 0,
              sidechain: 0,
              pitchshift: 0,
              slap: 0
            }
          )
        ),
        timbre: controllable(
          required({
            acousticPiano: controllable(optional(integer(0, 127), 0)),
            electricPiano: controllable(optional(integer(0, 127), 0)),
            digitalElectricPiano: controllable(optional(integer(0, 127), 0)),
            harpsichord: controllable(optional(integer(0, 127), 0)),
            clavinet: controllable(optional(integer(0, 127), 0)),
            celesta: controllable(optional(integer(0, 127), 0)),
            glockenspiel: controllable(optional(integer(0, 127), 0)),
            musicBox: controllable(optional(integer(0, 127), 0)),
            vibraphone: controllable(optional(integer(0, 127), 0)),
            marimba: controllable(optional(integer(0, 127), 0)),
            xylophone: controllable(optional(integer(0, 127), 0)),
            tubularBells: controllable(optional(integer(0, 127), 0)),
            dulcimer: controllable(optional(integer(0, 127), 0)),
            rockOrgan: controllable(optional(integer(0, 127), 0)),
            churchOrgan: controllable(optional(integer(0, 127), 0)),
            accordion: controllable(optional(integer(0, 127), 0)),
            harmonica: controllable(optional(integer(0, 127), 0)),
            tangoAccordion: controllable(optional(integer(0, 127), 0)),
            nylonAcousticGuitar: controllable(optional(integer(0, 127), 0)),
            steelAcousticGuitar: controllable(optional(integer(0, 127), 0)),
            cleanElectricGuitar: controllable(optional(integer(0, 127), 0)),
            mutedElectricGuitar: controllable(optional(integer(0, 127), 0)),
            overdrivenGuitar: controllable(optional(integer(0, 127), 0)),
            guitarHarmonics: controllable(optional(integer(0, 127), 0)),
            guitarFretNoise: controllable(optional(integer(0, 127), 0)),
            acousticBass: controllable(optional(integer(0, 127), 0)),
            fingeredElectricBass: controllable(optional(integer(0, 127), 0)),
            pickedElectricBass: controllable(optional(integer(0, 127), 0)),
            fretlessBass: controllable(optional(integer(0, 127), 0)),
            slapBass: controllable(optional(integer(0, 127), 0)),
            bassFretNoise: controllable(optional(integer(0, 127), 0)),
            analogueSynthBass: controllable(optional(integer(0, 127), 0)),
            digitalSynthBass: controllable(optional(integer(0, 127), 0)),
            violin: controllable(optional(integer(0, 127), 0)),
            viola: controllable(optional(integer(0, 127), 0)),
            cello: controllable(optional(integer(0, 127), 0)),
            contrabass: controllable(optional(integer(0, 127), 0)),
            tremoloStrings: controllable(optional(integer(0, 127), 0)),
            pizzicatoStrings: controllable(optional(integer(0, 127), 0)),
            orchestralHarp: controllable(optional(integer(0, 127), 0)),
            timpani: controllable(optional(integer(0, 127), 0)),
            stringEnsemble: controllable(optional(integer(0, 127), 0)),
            synthStrings: controllable(optional(integer(0, 127), 0)),
            synthChoir: controllable(optional(integer(0, 127), 0)),
            orchestraHit: controllable(optional(integer(0, 127), 0)),
            femaleSoloVoice: controllable(optional(integer(0, 127), 0)),
            maleSoloVoice: controllable(optional(integer(0, 127), 0)),
            childSoloVoice: controllable(optional(integer(0, 127), 0)),
            falsettoVoice: controllable(optional(integer(0, 127), 0)),
            womensChoir: controllable(optional(integer(0, 127), 0)),
            mensChoir: controllable(optional(integer(0, 127), 0)),
            mixedChoir: controllable(optional(integer(0, 127), 0)),
            childrensChoir: controllable(optional(integer(0, 127), 0)),
            trumpet: controllable(optional(integer(0, 127), 0)),
            trombone: controllable(optional(integer(0, 127), 0)),
            tuba: controllable(optional(integer(0, 127), 0)),
            mutedTrumpet: controllable(optional(integer(0, 127), 0)),
            frenchHorn: controllable(optional(integer(0, 127), 0)),
            brassSection: controllable(optional(integer(0, 127), 0)),
            synthBrass: controllable(optional(integer(0, 127), 0)),
            sopranoSax: controllable(optional(integer(0, 127), 0)),
            altoSax: controllable(optional(integer(0, 127), 0)),
            tenorSax: controllable(optional(integer(0, 127), 0)),
            baritoneSax: controllable(optional(integer(0, 127), 0)),
            oboe: controllable(optional(integer(0, 127), 0)),
            englishHorn: controllable(optional(integer(0, 127), 0)),
            bassoon: controllable(optional(integer(0, 127), 0)),
            clarinet: controllable(optional(integer(0, 127), 0)),
            piccolo: controllable(optional(integer(0, 127), 0)),
            flute: controllable(optional(integer(0, 127), 0)),
            recorder: controllable(optional(integer(0, 127), 0)),
            panFlute: controllable(optional(integer(0, 127), 0)),
            blownBottle: controllable(optional(integer(0, 127), 0)),
            shakuhachi: controllable(optional(integer(0, 127), 0)),
            whistle: controllable(optional(integer(0, 127), 0)),
            ocarina: controllable(optional(integer(0, 127), 0)),
            squareLead: controllable(optional(integer(0, 127), 0)),
            sawtoothLead: controllable(optional(integer(0, 127), 0)),
            calliopeLead: controllable(optional(integer(0, 127), 0)),
            chiffLead: controllable(optional(integer(0, 127), 0)),
            charangLead: controllable(optional(integer(0, 127), 0)),
            voiceLead: controllable(optional(integer(0, 127), 0)),
            fifthLead: controllable(optional(integer(0, 127), 0)),
            newAgePad: controllable(optional(integer(0, 127), 0)),
            warmPad: controllable(optional(integer(0, 127), 0)),
            polysynthPad: controllable(optional(integer(0, 127), 0)),
            choirPad: controllable(optional(integer(0, 127), 0)),
            bowedPad: controllable(optional(integer(0, 127), 0)),
            metallicPad: controllable(optional(integer(0, 127), 0)),
            haloPad: controllable(optional(integer(0, 127), 0)),
            sweepPad: controllable(optional(integer(0, 127), 0)),
            sitar: controllable(optional(integer(0, 127), 0)),
            banjo: controllable(optional(integer(0, 127), 0)),
            shamisen: controllable(optional(integer(0, 127), 0)),
            koto: controllable(optional(integer(0, 127), 0)),
            kalimba: controllable(optional(integer(0, 127), 0)),
            bagpipe: controllable(optional(integer(0, 127), 0)),
            fiddle: controllable(optional(integer(0, 127), 0)),
            shanai: controllable(optional(integer(0, 127), 0)),
            tinkleBell: controllable(optional(integer(0, 127), 0)),
            steelDrums: controllable(optional(integer(0, 127), 0)),
            woodblock: controllable(optional(integer(0, 127), 0)),
            taikoDrum: controllable(optional(integer(0, 127), 0)),
            melodicTom: controllable(optional(integer(0, 127), 0)),
            synthDrum: controllable(optional(integer(0, 127), 0)),
            reverseCymbal: controllable(optional(integer(0, 127), 0)),
            voiceSample: controllable(optional(integer(0, 127), 0)),
            synthSoundEffect: controllable(optional(integer(0, 127), 0)),
            naturalSoundEffect: controllable(optional(integer(0, 127), 0)),
            noise: controllable(optional(integer(0, 127), 0)),
            bassDrum: controllable(optional(integer(0, 127), 0)),
            rimshot: controllable(optional(integer(0, 127), 0)),
            snareDrum: controllable(optional(integer(0, 127), 0)),
            handClap: controllable(optional(integer(0, 127), 0)),
            tomTom: controllable(optional(integer(0, 127), 0)),
            closedHiHat: controllable(optional(integer(0, 127), 0)),
            openHiHat: controllable(optional(integer(0, 127), 0)),
            crashCymbal: controllable(optional(integer(0, 127), 0)),
            rideCymbal: controllable(optional(integer(0, 127), 0)),
            rideBell: controllable(optional(integer(0, 127), 0)),
            splashCymbal: controllable(optional(integer(0, 127), 0)),
            tambourine: controllable(optional(integer(0, 127), 0)),
            cowbell: controllable(optional(integer(0, 127), 0)),
            vibraSlap: controllable(optional(integer(0, 127), 0)),
            bongo: controllable(optional(integer(0, 127), 0)),
            conga: controllable(optional(integer(0, 127), 0)),
            timbale: controllable(optional(integer(0, 127), 0)),
            agogo: controllable(optional(integer(0, 127), 0)),
            cabasa: controllable(optional(integer(0, 127), 0)),
            maracas: controllable(optional(integer(0, 127), 0)),
            guiro: controllable(optional(integer(0, 127), 0)),
            claves: controllable(optional(integer(0, 127), 0)),
            woodBlock: controllable(optional(integer(0, 127), 0)),
            cuica: controllable(optional(integer(0, 127), 0)),
            triangle: controllable(optional(integer(0, 127), 0)),
            snap: controllable(optional(integer(0, 127), 0)),
            click: controllable(optional(integer(0, 127), 0))
          })
        ),
        sound: controllable(
          required({
            acoustic: controllable(optional(integer(0, 127), 0)),
            electric: controllable(optional(integer(0, 127), 0)),
            electronic: controllable(optional(integer(0, 127), 0))
          })
        ),
        type: controllable(
          required({
            melody: controllable(optional(integer(0, 127), 0)),
            solo: controllable(optional(integer(0, 127), 0)),
            chords: controllable(optional(integer(0, 127), 0)),
            arpeggio: controllable(optional(integer(0, 127), 0)),
            bassline: controllable(optional(integer(0, 127), 0)),
            hook: controllable(optional(integer(0, 127), 0)),
            riff: controllable(optional(integer(0, 127), 0)),
            rampUp: controllable(optional(integer(0, 127), 0)),
            rampDown: controllable(optional(integer(0, 127), 0)),
            fill: controllable(optional(integer(0, 127), 0)),
            hit: controllable(optional(integer(0, 127), 0)),
            break: controllable(optional(integer(0, 127), 0)),
            beat: controllable(optional(integer(0, 127), 0)),
            percussion: controllable(optional(integer(0, 127), 0))
          })
        ),
        texture: controllable(
          optional({
            monophonic: controllable(optional(integer(0, 127), 0)),
            polyphonic: controllable(optional(integer(0, 127), 0))
          })
        ),
        rhythm: controllable(
          required({
            groovy: controllable(optional(integer(0, 127), 0)),
            shuffled: controllable(optional(integer(0, 127), 0)),
            straight: controllable(optional(integer(0, 127), 0))
          })
        ),
        mood: controllable(
          required({
            aggressive: controllable(optional(integer(0, 127), 0)),
            agitated: controllable(optional(integer(0, 127), 0)),
            boring: controllable(optional(integer(0, 127), 0)),
            bright: controllable(optional(integer(0, 127), 0)),
            brutal: controllable(optional(integer(0, 127), 0)),
            busy: controllable(optional(integer(0, 127), 0)),
            cheesy: controllable(optional(integer(0, 127), 0)),
            cheerful: controllable(optional(integer(0, 127), 0)),
            confusing: controllable(optional(integer(0, 127), 0)),
            cool: controllable(optional(integer(0, 127), 0)),
            cute: controllable(optional(integer(0, 127), 0)),
            dark: controllable(optional(integer(0, 127), 0)),
            depressing: controllable(optional(integer(0, 127), 0)),
            dramatic: controllable(optional(integer(0, 127), 0)),
            energizing: controllable(optional(integer(0, 127), 0)),
            erotic: controllable(optional(integer(0, 127), 0)),
            euphoric: controllable(optional(integer(0, 127), 0)),
            exciting: controllable(optional(integer(0, 127), 0)),
            exotic: controllable(optional(integer(0, 127), 0)),
            funky: controllable(optional(integer(0, 127), 0)),
            funny: controllable(optional(integer(0, 127), 0)),
            gloomy: controllable(optional(integer(0, 127), 0)),
            happy: controllable(optional(integer(0, 127), 0)),
            heavy: controllable(optional(integer(0, 127), 0)),
            hypnotic: controllable(optional(integer(0, 127), 0)),
            light: controllable(optional(integer(0, 127), 0)),
            lively: controllable(optional(integer(0, 127), 0)),
            meditative: controllable(optional(integer(0, 127), 0)),
            melancholic: controllable(optional(integer(0, 127), 0)),
            melodramatic: controllable(optional(integer(0, 127), 0)),
            mysterious: controllable(optional(integer(0, 127), 0)),
            peaceful: controllable(optional(integer(0, 127), 0)),
            psychedelic: controllable(optional(integer(0, 127), 0)),
            quirky: controllable(optional(integer(0, 127), 0)),
            relaxed: controllable(optional(integer(0, 127), 0)),
            sad: controllable(optional(integer(0, 127), 0)),
            scary: controllable(optional(integer(0, 127), 0)),
            sentimental: controllable(optional(integer(0, 127), 0)),
            serene: controllable(optional(integer(0, 127), 0)),
            stressful: controllable(optional(integer(0, 127), 0)),
            sweet: controllable(optional(integer(0, 127), 0))
          })
        )
      })
    }
  ])
};
