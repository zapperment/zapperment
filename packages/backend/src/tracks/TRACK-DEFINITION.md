This document explains how to define a Zapperment track.

## tempo

The tempo at which this Zapperment track is playing.

- Type: number
- Default: `120`
- Controllable: yes

## beatsPerBar

Number of beats per musical measure. In 99% of all cases, you'll want to use the
default 4, which defines common four-four time.

- Type: number (integers only, not zero)
- Default: `4`
- Controllable: yes

## barsPerLoop

How many bars Zapperment will play before changing the scene. Most likely,
you'll want to use multiples of 4 for this, e.g. 4, 8, 16 or 32.

- Type: number (integers only, not zero)
- Default: `4`
- Controllable: yes

## channels

The channels of a Zapperment track are the musical elements that play together
to create a musical mix. You might have, for example, a channel setup like this:

| Channel | Description               |
| ------- | ------------------------- |
| 1       | Synthesizer lead (melody) |
| 2       | Synthesizer pad (chords)  |
| 3       | Bass                      |
| 4       | Drums                     |

At the most basic level, you can configure which channels are playing, for
example: “Let's just have the bass and drums playing.”

In Reason, you should set up one Combinator device for each channel, which can contain as many instruments,
effects or players as you like. The devices in the combinator can be connected to as many mixer channels
as you like. The mixer is irrelevant to Zapperment – control of Zapperment over the channels is exacted 
exclusively over the Combinators controls (in most cases, the rotary knobs and buttons)

In our basic example, the Reason rack would look like this:



### channels.meta

For each channel, you can define a meta object that explains to human readers
what is going on in this channel. Zapperment ignores this, think of it as a code
comment to help you and others understand your intent, how the channels relate
to what can be heard and what is in the Reason file.

#### channels.meta.name

The name of the channel, e.g. `"Synthesizer lead (melody)"`,
`"Synthesizer pad (chords)"`, `"Bass"` or `"Drums"`.

- Type: string or `null`
- Default: `null`
- Controllable: no

#### channels.meta.name

Additional description of the channel, e.g.
`"Melod line, sound adjustable from synthesizer to natural (strings)"`

- Type: string or `null`
- Default: `null`
- Controllable: no

#### channels.meta.color

The color that this channel's mixer channels, rack devices and sequencer tracks
have been set to in Reason. You can use this to identify which channel in the
JSON config relates to which parts in Reason more quickly.

- Type: string or `null`
- Default: `null`
- Controllable: no

**Tip:** You can use any value you like, since this is just for reference and is
ignored by Zapperment, _however_, it makes sense to stick to the 32
“Reason colors”, which are:

1. Burgundy
1. Red
1. Orange
1. Brown
1. Ochre
1. Peach
1. Wheat
1. Tangerine
1. Pineapple
1. Lemon
1. Bright lime
1. Light olive
1. Moss green
1. Kelly green
1. Asparagus
1. Dark green
1. Camouflage green
1. Turquoise
1. Blue in green
1. Powder blue
1. Light blue
1. Sky blue
1. Steel blue
1. Slate blue
1. Dark blue
1. Pink
1. Lilac
1. Plum
1. Neon violet
1. Deep purple
1. Graphite
1. Bright grey

### channels.midi

This part of the track configuration determines how Zapperment connects to reason through MIDI.

The settings for bus and channel correspond to the configuration in Reason in the “Advanced MIDI Device” in the
Reason rack.

### channels.midi.bus

The MIDI bus, A to D.

- Type: string (valid values are `"A"`, `"B"`, `"C"` or `"D"`)
- Default: `"A"`
- Controllable: no

### channels.elements

Each channel definition contains an [elements](#channelselements) object, which
you use for configuration.

### channels.elements.playing

Determines whether or not a channel is playing – if its sound output can be
heard.

- Type: boolean
- Default: `false`
- Controllable: yes – **recommended**

| Value   | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `true`  | The channel is playing, its sound output can be heard        |
| `false` | The channel is not playing, its sound output cannot be heard |

For our basic example, where only the bass and drums are playing, this would mean the
[playing](#channelselementsplaying) element is set like this:

| Channel | `channels.elements.playing` |
| ------- | ------------------------- |
| 1       | `false`                   |
| 2       | `false`                   |
| 3       | `true`                    |
| 4       | `true`                    |

The resulting track definition JSON file:

```json
{
  "channels": [
    {
      "meta": {
        "name": "Synthesizer lead (melody)"
      },
      "midi": {
        "channel": 1
      },
      "elements": {
        "playing": false
      }
    },
    {
      "meta": {
        "name": "Synthesizer pad (chords)"
      },
      "midi": {
        "channel": 2
      },
      "elements": {
        "playing": false
      }
    },
    {
      "meta": {
        "name": "Bass"
      },
      "midi": {
        "channel": 3
      },
      "elements": {
        "playing": true
      }
    },
    {
      "meta": {
        "name": "Drums"
      },
      "midi": {
        "channel": 4
      },
      "elements": {
        "playing": true
      }
    }
  ]
}
```

Note that while this is a valid track definition, it will produce extremely boring results – you will only ever
hear the drums and bass channels, because the `playing` elements are set to fixed values.

Things become more interesting if you let zapperment control which channels are playing. You do this by defining
the `playing` element as a controlled element:

```json
{
  "channels": [
    {
      "meta": {
        "name": "Synthesizer lead (melody)"
      },
      "midi": {
        "channel": 1
      },
      "elements": {
        "playing": {
          "button1": {
            "on": true,
            "off": false
          }
        }
      }
    },
    {
      "meta": {
        "name": "Synthesizer pad (chords)"
      },
      "midi": {
        "channel": 2
      },
      "elements": {
        "playing": {
          "button1": {
            "on": true,
            "off": false
          }
        }
      }
    },
    {
      "meta": {
        "name": "Bass"
      },
      "midi": {
        "channel": 3
      },
      "elements": {
        "playing": {
          "button1": {
            "on": true,
            "off": false
          }
        }
      }
    },
    {
      "meta": {
        "name": "Drums"
      },
      "midi": {
        "channel": 4
      },
      "elements": {
        "playing": {
          "button1": {
            "on": true,
            "off": false
          }
        }
      }
    }
  ]
}
```


### channels.elements.pitch

The pitch range of the music this channel is playing, specified by `min` and
`max`.

#### channels.elements.pitch.min

The lowest musical note this channel is playing.

- Type: string or `null`
- Default: `null`

| Value    | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| `null`   | Pitch does not apply to this channel; use this for drums, percussion, noise, sound effects, etc. |
| `"C-2"`  | MIDI note 0                                                                                      |
| `"C#-2"` | MIDI note 1                                                                                      |
| `"D-2"`  | MIDI note 2                                                                                      |
| `"D#-2"` | MIDI note 3                                                                                      |
| `"E-2"`  | MIDI note 4                                                                                      |
| `"F-2"`  | MIDI note 5                                                                                      |
| `"F#-2"` | MIDI note 6                                                                                      |
| `"G-2"`  | MIDI note 7                                                                                      |
| `"G#-2"` | MIDI note 8                                                                                      |
| `"A-2"`  | MIDI note 9                                                                                      |
| `"A#-2"` | MIDI note 10                                                                                     |
| `"B-2"`  | MIDI note 11                                                                                     |

(…)

| Value   | Description  |
| ------- | ------------ |
| `"C3"`  | MIDI note 60 |
| `"C#3"` | MIDI note 61 |
| `"D3"`  | MIDI note 62 |
| `"D#3"` | MIDI note 63 |
| `"E3"`  | MIDI note 64 |
| `"F3"`  | MIDI note 65 |
| `"F#3"` | MIDI note 66 |
| `"G3"`  | MIDI note 67 |
| `"G#3"` | MIDI note 68 |
| `"A3"`  | MIDI note 69 |
| `"A#3"` | MIDI note 70 |
| `"B3"`  | MIDI note 71 |

(…)

| Value   | Description   |
| ------- | ------------- |
| `"C8"`  | MIDI note 120 |
| `"C#8"` | MIDI note 121 |
| `"D8"`  | MIDI note 122 |
| `"D#8"` | MIDI note 123 |
| `"83"`  | MIDI note 124 |
| `"F8"`  | MIDI note 125 |
| `"F#8"` | MIDI note 126 |
| `"G8"`  | MIDI note 127 |

#### channels.elements.pitch.max

The highest musical note this channel is playing.

- Type: string
- Values table: see [channels.elements.pitch.min](#channelselementspitchmin)
  above
