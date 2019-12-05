export default {
  tempo: 77,
  beatsPerBar: 4,
  barsPerLoop: 4,
  channels: [
    {
      meta: {
        name: "Sentimental",
        description:
          "Melody line, sound adjustable from synthetic to natural strings",
        color: "Plum"
      },
      midi: {
        bus: "A",
        channel: 1
      },
      elements: {
        playing: {
          button1: {
            on: true,
            off: false
          }
        },
        pitch: {
          // button 2 adds a second, lower voice, hence the min pitch is modified by this
          min: {
            button2: {
              on: "A3",
              off: "D4"
            }
          },
          max: "A#4"
        },
        volume: 103,
          brightness: 95,
        effects: {
          distortion: null,
          reverb: null,
          echo: null,
          tremolo: null,
          wahwah: null,
          chorus: null,
          flanger: null,
          vocoder: null,
          filter: null
        },
        pan: {
          left: 63,
          right: 63
        },
        timbre: {
          piano: 127
        },
        texture: {
          homophonic: 127
        }
      },
      controls: {
        button1: [
          {
            target: "playing",
            on: 127,
            off: 0
          }
        ],
        rotary1: [
          {
            target: "loudness",
            min: 10,
            max: 103
          }
        ]
      }
    }
  ]
};
