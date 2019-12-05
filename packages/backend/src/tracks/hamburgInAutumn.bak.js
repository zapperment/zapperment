module.exports = {
  tempo: 77,
  barsPerLoop: 4,
  channels: [
    {
      name: "Dm Piano Riff",
      elements: {
        playing: 127,
        pitch: {
          min: 26, // D1
          max: 48 // C3
        },
        loudness: 103,
        brightness: 95,
        dirt: 0,
        location: {
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
      midi: {
        bus: 0,
        channel: 0
      },
      controls: {
        button1: [{
          target: "playing",
          on: 127,
          off: 0
        }],
        rotary1: [{
          target: "loudness",
          min: 10,
          max: 103
        }]
      }
    },
    {
      name: "Bottle Perc",
      elements: {
        playing: 127,
        pitch: null, // null means it's not applicable (because it's percussive)
        loudness: 79, // the least loud channel
        brightness: 79,
        dirt: 0,
        location: {
          left: 31,
          right: 95
        },
        timbre: {
          click: 79,
          bongo: 119,
          snare: 47,
          fingerSnap: 87
        },
        texture: null
      },
      midi: {
        bus: 0,
        channel: 1
      },
      controls: {
        button1: {
          target: "playing",
          on: 127,
          off: 0
        }
      }
    },
    {
      name: "FM Arp",
      elements: {
        playing: 127,
        pitch: {
          min: 62, // D4
          max: 79 // G5
        },
        loudness: 95,
        brightness: 127,
        dirt: 0,
        location: {
          left: 31,
          right: 95
        },
        timbre: {
          bell: 127,
          pizzicato: 47
        },
        texture: {
          polyphonic: 127
        }
      },
      midi: {
        bus: 0,
        channel: 2
      },
      controls: {
        button1: {
          target: "playing",
          on: 127,
          off: 0
        }
      }
    },
    {
      name: "Fuzz Bass",
      elements: {
        playing: 127,
        pitch: {
          min: 36, // C2,
          max: 41 // F2
        },
        loudness: 119,
        brightness: 31,
        dirt: 95,
        location: {
          left: 15,
          right: 111
        },
        timbre: {
          synthBass: 127
        },
        texture: {
          monophonic: 127
        }
      },
      midi: {
        bus: 0,
        channel: 3
      },
      controls: {
        button1: {
          target: "playing",
          on: 127,
          off: 0
        }
      }
    },
    {
      name: "Dirty Beat",
      elements: {
        pitch: null,
        loudness: 127, // the loudest channel
        brightness: 63,
        dirt: 63,
        location: {
          left: 31,
          right: 79
        },
        timbre: {
          bassDrum: 111,
          snareDrum: 95,
          hiHat: 119
        },
        texture: null
      },
      midi: {
        bus: 0,
        channel: 4
      },
      controls: {
        button1: {
          target: "playing",
          on: 127,
          off: 0
        }
      }
    }
  ]
};
