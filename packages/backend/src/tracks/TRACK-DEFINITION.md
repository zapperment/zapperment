This document explains how to define a Zapperment track.

The Zapperment track definition explains to Zapperment what the Reason track
that is playing sounds like and how Zapperment can take control of the sound.

Track definition is done through text files in
[JSON format](https://en.wikipedia.org/wiki/JSON) (JavaScript object notation).

To get an idea what the track definition files and the accompanying Reason files
look like, take a look at the
[tracks](https://github.com/technology-ebay-de/zapperment/tree/master/tracks)
directory, which contains several examples.

# Table of Contents

<details><summary>show</summary>

- [meta](#meta)
  - [title](#metatitle)
  - [description](#metadescription)
  - [artists](#metaartists)
    - [name](#metaartistsname)
    - [role](#metaartistsrole)
    - [url](#metaartistsurl)
  - [link](#metalink)
    - [text](#metalinktext)
    - [url](#metalinkurl)
  - [copyright](#metacopyright)
  - [license](#metalicense)
- [tempo](#tempo)
- [barsPerLoop](#barsperloop)
- [beatsPerBar](#beatsperbar)
- [channels](#channels)
  - [meta](#channelsmeta)
    - [name](#channelsmetaname)
    - [description](#channelsmetadescription)
    - [color](#channelsmetacolor)
  - [midi](#channelsmidi)
    - [channel](#channelsmidichannel)
    - [bus](#channelsmidibus)
  - [playing](#channelsplaying)
  - [elements](#channelselements)
    - [pitch](#channelselementspitch)
      - [min](#channelselementspitchmin)
      - [max](#channelselementspitchmax)
    - [volume](#channelselementsvolume)
    - [pan](#channelselementspan)
      - [left](#channelselementspanleft)
      - [right](#channelselementspanright)
    - [brightness](#channelselementsbrightness)
    - [effects](#channelselementseffects)
      - [distortion](#channelselementseffectsdistortion)
      - [reverb](#channelselementseffectsreverb)
      - [echo](#channelselementseffectsecho)
      - [tremolo](#channelselementseffectstremolo)
      - [vibrato](#channelselementseffectsvibrato)
      - [chorus](#channelselementseffectschorus)
      - [unison](#channelselementseffectsunison)
      - [flanger](#channelselementseffectsflanger)
      - [phaser](#channelselementseffectsphaser)
      - [vocoder](#channelselementseffectsvocoder)
      - [gater](#channelselementseffectsgater)
      - [filter](#channelselementseffectsfilter)
      - [sidechain](#channelselementseffectssidechain)
      - [pitchshift](#channelselementseffectspitchshift)
    - [timbre](#channelselementstimbre)
    - [sound](#channelselementssound)
    - [type](#channelselementstype)
    - [texture](#channelselementstexture)
    - [rhythm](#channelselementsrhythm)
    - [mood](#channelselementsmood)

</details>

# Basic Structure

The basic structure of a Zapperment track definition looks like this:

    {
      "meta": { … },
      "tempo": …,
      "baryPerLoop": …,
      "beatsPerBar": …,
      "channels": [
        {
          "meta": { … },
          "midi": { … },
          "playing": …,
          "elements": {
            "pitch": { … },
            "volume": …,
            "pan": { … },
            "brighness": …,
            "effects": { … },
            "timbre": { … },
            "texture": { … },
            "rhythm": { … },
            "mood": { … }
        }
      ]
    }

# Reference

Each of the parts of a Zapperment track definition are explained in this
reference section.

## meta

The meta section of your Zapperment file is used for general information about
your track. It is irrelevant for Zapperment's music mixing algorithms, but may
be interesting for human readers of your configuration, and may be displayed on
the Zapperment website when the track is playing.

##### 💡 Example

```json
{
  "meta": {
    "title": "Hamburg in Autumn",
    "description": "Moderate tempo chill-out track for concentrating at work",
    "artists": [
      {
        "name": "Patrick Hund",
        "role": "Producer",
        "url": "https://www.twitter.com/wiekatz"
      }
    ],
    "link": {
      "text": "Visit Zapperment!",
      "url": "http://zapperment.rocks/"
    },
    "copyright": "©2019 Patrick Hund",
    "license": "Creative Commons Attribution 4.0 International"
  }
}
```

##### ⚠️ Please Note

- **Meta information may be displayed publicly** – do not include any
  information you do not want to be shown on the Zapperment website or anywhere
  else. Do not include personal contact information anywhere (email address,
  phone number, etc.)
- **Do not include any HTML code** in any string you provide in the meta data or
  anywhere else. HTML code will not cause any formatting of the information on
  the Zapperment website.

### meta.title

The title of your track.

- Type: string or `null`
- Required (no default)
- Controllable: no

### meta.description

Description of your track, use 1-3 short sentences.

- Type: string or `null`
- Default: `null`
- Controllable: no

### meta.artists

Information about the artists that created this track.

- Type: array of objects or `null`
- Default: `null`
- Controllable: no

#### meta.artists.name

The name of the artist. Remember that this is public information, if the artist
wishes to remain anonymous, do not include them in the list of artists.

The name does not have to be a clear name, nick names or pseudonyms are fine.

- Type: string or `null`
- Required (no default)
- Controllable: no

#### meta.artists.role

The role of the artist, optional. Use this to describe what the artist
contributed to this track, for example, what instrument they played.

- Type: string or `null`
- Default: `"Producer"`
- Controllable: no

#### meta.artists.url

URL of publicly accessible website for this artist, optional. Use this for
example for links to their SoundCloud page or Twitter profile.

- Type: string or `null`
- Default: `null`
- Controllable: no

### meta.link

Optional link for this track. Use it to promote this or other music on
SoundCloud, Spotify, etc. Please be reasonable and don't spam. Don't link to
sexual or offensive content.

- Type: object or `null`
- Default: `null`
- Controllable: no

#### meta.link.url

URL of the link.

- Type: string or `null`
- Default: `null`
- Controllable: no

#### meta.link.text

Text of the link.

- Type: string or `null`
- Default: `null`
- Controllable: no

### meta.copyright

Copyright information, commonly comprised of the creation date and the copyright
owner's name.

- Type: string or `null`
- Default: `null`
- Controllable: no

### meta.license

Licensing information. Since Zapperment is an open source project, we strongly
recommend using a permissive, open license for your work, such as
[Creative Commons](https://creativecommons.org/).

Pull requests to Zapperment with Reason tracks that are not published under the
Creative Commons license will be rejected.

- Type: string
- Default: `"Creative Commons Attribution 4.0 International"`
- Controllable: no

## tempo

The tempo at which this Zapperment track is playing, measured in beats per
minute (BPM).

- Type: number (integer or floating point, 1–999)
- Default: `120`
- Controllable: yes

## barsPerLoop

How many bars Zapperment will play before changing the scene. Most likely,
you'll want to use multiples of 4 for this, e.g. 4, 8, 16 or 32.

- Type: number (integer, 1-999)
- Default: `4`
- Controllable: yes – while it is not recommended to let Zapperment control
  this, it may make for interesting experiments

## beatsPerBar

Number of beats per musical measure. In 99.99% of all cases, you'll want to use
the default 4, which defines common four-four time.

- Type: number (integer, 1-16)
- Default: `4`
- Controllable: no

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

In Reason, you should set up one Combinator device for each channel, which can
contain as many instruments, effects or players as you like. The devices in the
combinator can be connected to as many mixer channels as you like. The mixer is
irrelevant to Zapperment – control of Zapperment over the channels is exacted
exclusively over the Combinators controls (in most cases, the rotary knobs and
buttons)

In our basic example, the Reason rack would look like this:

![Basic example of a Zapperment track's rack in Reason](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/basic-zapperment-rack.png)

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

#### channels.meta.description

Additional description of the channel, e.g.
`"Melody line, sound adjustable from synthesizer to natural (strings)"`

- Type: string or `null`
- Default: `null`
- Controllable: no

#### channels.meta.color

The color that this channel's mixer channels, rack devices and sequencer tracks
have been set to in Reason. You can use this to identify which channel in the
JSON config relates to which parts in Reason more quickly.

- Type: string or `null` (use one of Reason's channel colors, see
  [Colors](#colors) in Addendum)
- Default: `null`
- Controllable: no

##### 💡 Tip

If you want to colorize not only the mixer channels of your Reason track, but
also the Combinators that play your Zapperment channels,
[you can download custom Combinator skins for each color for free](https://drive.google.com/drive/folders/1ChWc36Ps6xFvFYi7-aiRpjEaogcAuGeC?fbclid=IwAR15kGwTB4Kb8-LDSpW1D4Ab2xstI9WFjaCSy1UcjPoqXgRcEFAq1slChPc).

### channels.midi

This part of the track configuration determines how Zapperment connects to
reason through MIDI.

The settings for bus and channel correspond to the configuration in Reason in
the “Advanced MIDI Device” in the Reason rack.

![Advanced MIDI Device](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/advanced-midi.png)

#### channels.midi.channel

The MIDI channel over which Zapperment controls this channel – 1 to 16.

- Type: number (integer 1 to 16)
- Default: `1`
- Controllable: no

#### channels.midi.bus

The MIDI bus over which Zapperment controls this channel – A to D.

You only need to bother with this if you want to set up a Zapperment track that
has more than 16 channels, otherwise the default setting `"A"` is sufficient.

By using multiple buses, you can create tracks with up to 64 channels (4 MIDI
buses x 16 MIDI channels).

- Type: string (valid values are `"A"`, `"B"`, `"C"` or `"D"`)
- Default: `"A"`
- Controllable: no

### channels.playing

Determines whether or not a channel is playing – if its sound output can be
heard.

This is the most important way for Zapperment to control the mix of your Reason
track, so in most cases, you want to make this controllable.

By convention, Combinator button 1 is used to turn _playing_ on and off.

- Type: boolean
- Default: `false`
- Controllable: yes – **recommended**

| Value   | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `true`  | The channel is playing, its sound output can be heard        |
| `false` | The channel is not playing, its sound output cannot be heard |

##### 💡 Example

For our basic example, where only the bass and drums are playing, this would
mean the [playing](#channelsplaying) element is set like this:

| Channel | `channels.playing` |
| ------- | ------------------ |
| 1       | `false`            |
| 2       | `false`            |
| 3       | `true`             |
| 4       | `true`             |

The resulting track definition JSON file:

```json
{
  "channels": [
    {
      "meta": { "name": "Synthesizer lead (melody)" },
      "midi": { "channel": 1 },
      "playing": false
    },
    {
      "meta": { "name": "Synthesizer pad (chords)" },
      "midi": { "channel": 2 },
      "playing": false
    },
    {
      "meta": { "name": "Bass" },
      "midi": { "channel": 3 },
      "playing": true
    },
    {
      "meta": { "name": "Drums" },
      "midi": { "channel": 4 },
      "playing": true
    }
  ]
}
```

Note that while this is a valid track definition, it will produce extremely
boring results – you will only ever hear the drums and bass channels, because
`playing` is set to fixed values on all channels.

Things become more interesting if you let Zapperment control which channels are
playing. You do this by defining `playing` as controlled:

```json
{
  "channels": [
    {
      "meta": { "name": "Synthesizer lead (melody)" },
      "midi": { "channel": 1 },
      "playing": {
        "button1": { "on": true, "off": false }
      }
    },
    {
      "meta": { "name": "Synthesizer pad (chords)" },
      "midi": { "channel": 2 },
      "playing": {
        "button1": { "on": true, "off": false }
      }
    },
    {
      "meta": { "name": "Bass" },
      "midi": { "channel": 3 },
      "playing": {
        "button1": { "on": true, "off": false }
      }
    },
    {
      "meta": { "name": "Drums" },
      "midi": { "channel": 4 },
      "playing": {
        "button1": { "on": true, "off": false }
      }
    }
  ]
}
```

With this track configuration, for every loop iteration, Zapperment will create
a different combination of the four channels by deciding for each channel's
combinator device whether to turn button 1 on or off.

### channels.elements

Each channel definition contains an elements object, which you use to describe
the music the channel is playing and determine how it can be changed through the
Combinator controls.

While it _is_ possible to omit _elements_, this is not recommended – a channel
with no elements will not be included in Zapperment's machine learning
algorithms. If it is turned off or on will always be totally random and not
influenced by feedback from the audience.

- Type: object or `null`
- Default: `null`
- Controllable: no (only the elements themselves are controllable, not the whole
  elements object)

#### channels.elements.pitch

The pitch range of the music this channel is playing, specified by `min` and
`max`.

To find out the best values for this element, look at the sequencer track that
is playing playing the channel and find the highest and lowest notes.

If your channel is playing something that does not have a musical pitch in the
traditional sense, just omit this element or set it to `null`.

This makes sense for channel content like drums, percussion, sound effects or
noise.

- Type: object or `null`
- Default: `null`
- Controllable: no (only the sub-elements can be controlled)

##### 💡 Tip

This element is mainly used to describe to Zapperment what the channel sounds
like, so in most cases, you won't have to make this a controllable element.

That being said, there are scenarios where it _does_ make sense, for example:

- You have a rotary knob that switches sequencer or arpeggiator patterns,
  changing the notes being played
- You have buttons that add additional voice being played, for example a piano
  channel that plays the right hand only unless you activate the “left hand”
  button

##### channels.elements.pitch.min

The lowest musical note this channel is playing.

- Type: string – the note name plus octave, e.g. `"C#3"` – see
  [Note Names](#note-names) in the addendum below
- Required (no default) if [channels.elements.pitch](#channelselementspitch) is
  used at all
- Controllable: yes

##### channels.elements.pitch.max

The highest musical note this channel is playing.

- Type: string – the note name plus octave, e.g. `"C#3"` – see
  [Note Names](#note-names) in the addendum below
- Required (no default) if [channels.elements.pitch](#channelselementspitch) is
  used at all
- Controllable: yes

#### channels.elements.volume

The volume at which the channel is playing. This will help Zapperment understand
if this channel is very noticeable in the mix or if it is more of a background
type channel.

It's a bit tricky to get the value for this right. Try to use your best
judgement, look at the volumes the channel's devices have in the mixer and set
this in relation to the volume of the other channels, as well as in relation to
the default volume of `95`, which would be a mixer fader at 75%.

- Type: number (integer, 0 to 127)
- Default: `95`
- Controllable: yes

#### channels.elements.pan

Use this to describe or control the stereo panorama position of the channel's
output.

If you omit this, as a default value, a position flat and square in the middle
will be set.

- Type: object
- Default: `{ "left": 63, "right": 63 }`
- Controllable: no (but the sub-elements can be controlled)

##### channels.elements.pan.left

The leftmost position in the stereo panorama that the signal from this channel
occupies.

- Type: number (integer 0-127, must be lower than or equal to
  [channels.elements.pan.right](#channelselementspanright))
- Required (no default) if [channels.elements.pan](#channelselementspan) is used
  at all
- Controllable: yes

##### channels.elements.pan.right

The rightmost position in the stereo panorama that the signal from this channel
occupies.

- Type: number (integer 0-127, must be higher than or equal to
  [channels.elements.pan.left](#channelselementspanleft))
- Required (no default) if [channels.elements.pan](#channelselementspan) is used
  at all
- Controllable: yes

#### channels.elements.brightness

This element describes how dull or bright the channel sounds. Technically, this
means how many overtones the sound has.

A classic example is a synthesizer's cutoff frequency: If the cutoff is turned
down, the sound is dull, when is turned up, it gets brighter.

It is recommended to always use this, be it as a fixed or controlled element. If
you omit it, Zapperment will assume that the sound is moderately bright.

- Type: number (integer 0-127)
- Default: `95`
- Controllable: yes

##### 💡 Example

Let's say your channel is playing a
[Moog](https://en.wikipedia.org/wiki/Moog_synthesizer) type synth bass, using a
[Subtractor](https://www.reasonstudios.com/en/reason/instruments/subtractor)
device. The subtractor is sitting in a Combinator. You assign rotary knob 1 to
the Subtractor's filter frequency. You can now make the sound brighter by
rotating the knob, yay!

![Example for controlling brightness](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/brightness-example.png)

To make Zapperment understand that it, too, can rotate that knob to make the
sound brighter, you use the _brightness_ element like this:

```json
{
  "brightness": {
    "rotary1": {
      "min": 31,
      "max": 95
    }
  }
}
```

##### ⚠️ Please Note

We are not setting min to 0 and max to 127 in the example above – we are
restricting the range here because if the filter is turned all the way down, no
sound at all will be heard, and if it is cranked up all the way, the sound is
too harsh.

While you could also limit the range in the Combinator controller, it is always
best to limit the range on the end of Zapperment. Remember, the track definition
is not just for defining how to control the sound, but also for describing what
the sound is like – so setting _brightness_ to 127 should always mean: “Wow,
it's super bright, it hurts!”

#### channels.elements.effects

Reason has many, many effects devices to spice up the sound. This element
describes which effects are used for the channel to which extend and allows you
to tell Zapperment to take control of effect settings.

If you omit this or set it to `null`, Zapperment will assume that the channels
sound is absolutely clean and dry.

- Type: object or `null`
- Default: `null`
- Controllable: no (but the sub-elements are controllable)

You can configure as many of the effects listed below at the same time, just
like you can slap as many effects devices on a sound source in the Reason rack.
For each device, you define a numerical value that describes how much of the
effect is applied, or define a control that lets Zapperment decide for itself.

##### channels.elements.effects.distortion

![Scream 4](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/scream4.jpg)

This defines how distorted the sound is. Typical Reason rack devices for
distortion are
[Scream 4](https://www.reasonstudios.com/en/reason/effects/scream-4) and
[Pulverizer Demolition](https://www.reasonstudios.com/en/reason/effects/pulveriser).

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.reverb

![RV7000 MkII](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/rv7000.jpg)

Defines how much reverb is applied to the channel's sound. Typical Reason rack
device: [RV7000 MkII](https://www.reasonstudios.com/en/reason/effects/rv7000).

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.echo

![The Echo](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/the-echo.jpg)

Defines how much echo is applied to the channel's sound, also known as delay.
Typical Reason rack devices:
[The Echo](https://www.reasonstudios.com/en/reason/effects/the-echo) or
[RV7000 MkII](https://www.reasonstudios.com/en/reason/effects/rv7000)

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.tremolo

![Pulveriser Demolition](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/pulveriser.jpg)

Defines how much tremolo is applied to the channel's sound. Tremolos are cyclic
variations of the sound's volume. Typical Reason rack device:
[Pulverizer Demolition](https://www.reasonstudios.com/en/reason/effects/pulveriser)
(using the “Tremor” section). The effect may also be created by a synthesizer's
LFO.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.vibrato

![Pulsar](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/pulsar.jpg)

Defines how much vibrato is applied to the channel's sound. Vibratos are cyclic
variations of the sound's pitch. Typically, this effect is created by a
synthesizer's LFO, or an external LFO like the
[Pulsar Dual LFO](https://www.reasonstudios.com/en/reason/utilities/pulsar)
affecting a device's pitch.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.chorus

![Quartet Chorus Ensemble](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/quartet.jpg)

Defines how much chorus is applied to the channel's sound. Chorus effects add
warmth and depth to the sound. Some synthesizers in Reason like
[Thor](https://www.reasonstudios.com/en/reason/instruments/thor) have a chorus
built in. Besides the basic CF-101 device, Reason 11 and later comes with the
[Quartet Chorus Ensemble](https://www.reasonstudios.com/en/reason/effects/quartet)
that can be used for chorus.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.unison

![Europa](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/europa.png)

Defines how much unison is applied to the channel's sound. Unison fattens up the
sound by duplicating voices with detune. Besides the basic UN-16 device, the
[Europa](https://www.reasonstudios.com/en/reason/instruments/europa) synthesizer
has a powerful unison section.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.flanger

![Sweeper Modulation Effect](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/sweeper.jpg)

Defines how much flanging is applied to the channel's sound. Flangers add an
additional voice to the signal which is delayed by a small and gradually
changing period. Besides the basic CF-101 device, in Reason 11 and later, the
[Sweeper Modulation Effect](https://www.reasonstudios.com/en/reason/effects/sweeper)
can be used for flanging.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.phaser

![Sweeper Modulation Effect](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/sweeper.jpg)

Defines how much phaser is applied to the channel's sound. Phasers add a series
of peaks and troughs to the signal's frequency spectrum that are modulated over
time. Besides the basic PH-90 device, in Reason 11 and later, the
[Sweeper Modulation Effect](https://www.reasonstudios.com/en/reason/effects/sweeper)
can be used for phasing.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.vocoder

![BV512](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/bv512.jpg)

Defines how much vocoder is applied to the channel's sound. Vocoders allow to
change the sound texture and pitch to be changed independently, creating “robot
voice” kinds of effects. This is typically done with the
[BV512](https://www.reasonstudios.com/en/reason/effects/bv-512) rack device in
Reason.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.gater

![Alligator Filter Gate](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/alligator.jpg)

Defines how much gating is applied to the channel's sound. Gating is a technique
where modulation of frequency and/or volume is applied rhythmically. It is
popular in genres like trance and typically done with the
[Alligator Filter Gate](https://www.reasonstudios.com/en/reason/effects/alligator)
in the Reason rack.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.filter

Defines how much filtering is applied to the channel's sound. For the sake of
Zapperment configuration, by filtering, we mean filters effects that change the
sound over time, like a sweeping effect. If filters are applied rhythmically
rather than changing more slowly, use
[channels.elements.effects.gater](#channelselementseffectsgater) instead. We
don't distinguish between low-pass, high-pass, band-pass or notch here – if it
is sweeping, it's a filter effect.

Besides the basic ECF-42, filter effects can be done with pretty much any
synthesizer in the Reason rack.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.sidechain

![MClass Compressor](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/m-compressor.jpg)

Defines how much sidechaining is applied to the channel's sound. Sidechain
compression means the dynamics of one signal is feed into a compressor to
control the dynamics of another, producing “pumping” effects. Typical devices
for this are the
[MClass Compressor](https://www.reasonstudios.com/en/reason/effects/m-compressor)
or the
[Master Bus Compressor](https://www.reasonstudios.com/en/reason/effects/master-bus-compressor)
that was added in Reason 11.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

##### channels.elements.effects.pitchshift

![Neptune Pitch Adjuster](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/neptune.jpg)

Defines how much pitch shifting is applied to the channel's signal. Typically
used for vocals. Pitch shifters can sound natural to create additional voices
for making a choir out of a solo voice or make up for a singer's lacking talent.
They can also sound extreme to create the kind of robot voice that is popular in
genres like trap.

In the Reason rack, this is typically done with the
[Neptune Pitch Adjuster](https://www.reasonstudios.com/en/reason/effects/neptune)
or the
[Polar Dual Pitch Shifter](https://www.reasonstudios.com/en/reason/rack-extensions/polar)
added in Reason 11.

- Type: number (integer 0-127)
- Default: `0`
- Controllable: yes

#### channels.elements.timbre

The _timbre_ element describes to Zapperment what the channel sounds like by
using the names of well-known musical instruments. Select from one of the
[pre-defined timbres](#timbres) to approximate the sound.

Of course, many times you will find that your sound is so unique that it doesn't
properly match any of the available timbres. In this case, just try to come up
with something as close as possible using what's available.

You can mix any number of timbres you like to describe the channel sound.

The _timbre_ element is a JSON object with keys that correspond to the keys in
the [timbre tables](#timbres) in the Addendum and values that rate how much this
channel sounds like this timbre on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

##### 💡 Examples

This is the most basic way of defining the timbre for a channel that plays a
piano sound:

```json
{
  "timbre": {
    "acousticPiano": 127
  }
}
```

If you have a sound that kind of sounds like a choir, but also somewhat like a
synthesizer pad, you might configure something like this:

```json
{
  "timbre": {
    "aahChoir": 95,
    "warmPad": 31
  }
}
```

For a channel that plays a drum beat, you can use the drum and percussion
timbres. The values should represent how dominantly (loud and often) the sound
can be heard:

```json
{
  "timbre": {
    "bassDrum": 83,
    "snareDrum": 54,
    "closedHiHat": 77,
    "openHiHat": 14
  }
}
```

The values are not an exact science – think of it as describing to a friend what
your drum beat sounds like: “It's mostly the kick drum, with the snare hitting
every other beat, together with a hi-hat that plays throughout.”

The JSON code is the “language” you use to talk to Zapperment to describe your
music.

Any of the timbres can be defined as controllable. For example, you might create
a brass ensemble Combinator with three
[NN-19](https://www.reasonstudios.com/en/reason/instruments/nn-19) samplers that
play saxophone, trumpet and trombone:

![Timbre mixing combinator](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/timbre-mix-example.png)

The JSON code would look like this:

```json
{
  "timbre": {
    "sopranoSax": {
      "rotary1": {
        "min": 0,
        "max": 127
      }
    },
    "trombone": {
      "rotary2": {
        "min": 0,
        "max": 127
      }
    },
    "trumpet": {
      "rotary3": {
        "min": 0,
        "max": 127
      }
    }
  }
}
```

Now Zapperment can take control and find out which combination of saxophone,
trombone and trumpet the audience likes best!

#### channels.elements.sound

The type element is used to describe what basic type of sound the channel is
playing. There are only three sound types:

| Name       | Key            |
| ---------- | -------------- |
| Acoustic   | `"acoustic"`   |
| Electric   | `"electric"`   |
| Electronic | `"electronic"` |

- Use _acoustic_ for natural instruments, e.g. piano, strings, vocals; if you
  use a sampler to emulate an acoustic sound, e.g. a violin or acoustic guitar,
  that is considered acoustic, too, even though in the more narrow sense, any
  sound coming from a sampler is, of course, actually electronic
- Use _electric_ for electrically amplified instruments, e.g. electric guitar,
  bass or e-piano
- Use _electronic_ for synthesizers and synthetic drum and percussion sounds, as
  well as sampled natural sounds that are highly processed and not intended to
  sound like an electric or acoustic instrument

Similar to the [channels.elements.timbre](#channelselementstimbre) element, the
_sound_ element is a JSON object with keys that correspond to the keys in the
table above and values that rate how much this channel's sound type corresponds
to the type on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

##### 💡 Example

Let's say you have a channel that plays the guitar. You've configured the
channel's Combinator button to switch between an acoustic and an electric guitar
sound:

![Guitar channel](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/guitar-example.png)

You let Zapperment control if the channel plays an electric or acoustic guitar
by making the _sound_ element controllable, through button 2:

```json
{
  "sound": {
    "acoustic": {
      "button2": {
        "min": 127,
        "max": 0
      }
    },
    "electric": {
      "button2": {
        "min": 0,
        "max": 127
      }
    }
  }
}
```

#### channels.elements.type

Use _type_ to describe the type of musical and rhythmic pattern the channel is
playing. It becomes clearer when you look at the available types below.

| Name       | Key            |
| ---------- | -------------- |
| Melody     | `"melody"`     |
| Solo       | `"solo"`       |
| Chords     | `"chords"`     |
| Arpeggio   | `"arpeggio"`   |
| Bassline   | `"bassline"`   |
| Hook       | `"hook"`       |
| Riff       | `"riff"`       |
| Fill       | `"fill"`       |
| Hit        | `"hit"`        |
| Break      | `"break"`      |
| Beat       | `"beat"`       |
| Percussion | `"percussion"` |

- Use _melody_ for a channel that is playing a “linear succession of musical
  tones that the listener perceives as a single entity” (see
  [Wikipedia](https://en.wikipedia.org/wiki/Melody))
- Use _solo_ for a channel where a single instrument is playing in a free,
  improvised way (see [Wikipedia](<https://en.wikipedia.org/wiki/Solo_(music)>))
- Use _chords_ for a channel where an instrument is playing multiple notes
  together to form chords, typically a synthesizer pad or a piano (see
  [Wikipedia](<https://en.wikipedia.org/wiki/Chord_(music)>))
- Use _arpeggio_ for a channel where an instrument is playing chords that are
  broken into a sequence of notes, rising or ascending, repeating cyclically
  (see [Wikipedia](https://en.wikipedia.org/wiki/Arpeggio))
- Use _bassline_ for a channel where a monophonic instrument is playing notes in
  a lower register (see [Wikipedia](https://en.wikipedia.org/wiki/Bassline))
- Use _hook_ for a channel that is playing a short, catchy musical phrase (see
  [Wikipedia](<https://en.wikipedia.org/wiki/Hook_(music)>))
- Use _riff_ for a channel that is playing “a brief, relaxed phrase” (see
  [Wikipedia](https://en.wikipedia.org/wiki/Ostinato#Riff))
- Use _fill_ for a channel that is playing a short musical, percussive phrase or
  sound effect at the end of the loop intended to lead over to the next loop
  iteration (see [Wikipedia](<https://en.wikipedia.org/wiki/Fill_(music)>))
- Use _hit_ for a channel that is playing a percussive sound, sound effect or
  musical phrase at the beginning of the loop intended to mark its beginning
- Use _break_ for a channel that is playing nothing or very little – use this
  for example if you have a channel that gives Zapperment control over various
  drum patterns (see [Wikipedia](<https://en.wikipedia.org/wiki/Break_(music)>))
- Use _beat_ for a channel that is playing a steady drum pattern, typically with
  a bass drum and a snare drum (see
  [Wikipedia](https://en.wikipedia.org/wiki/Drum_beat))
- Use _percussion_ for a channel that is playing a percussion or drum pattern
  that does not fall into the _beat_ category – this could be something like a
  tamborine or congas

Similar to the [channels.elements.timbre](#channelselementstimbre) element, the
_type_ element is a JSON object with keys that correspond to the keys in the
table above and values that rate how much this channel corresponds to the type
on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

##### 💡 Basic Example: Synthesizer Pad

For a Zapperment channel that plays a chord progression with a synthesizer pad
sound, without any controls, the JSON code looks like this:

```json
{
  "type": {
    "chords": 127
  }
}
```

##### 💡 Advanced Example: Controlling Drum Patterns

Create a channel that gives Zapperment control over which pattern the
[Drum Sequencer](https://www.reasonstudios.com/shop/rack-extension/drum-sequencer/)
is playing through rotary know 1:

![Zapperment channel with drum pattern control](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/drum-example.png)

In the drum sequencer, pattern 1 is playing a basic drum beat with kick, snare
and hi-hat. In pattern 2, a snare drum fill is added to the beat at the end. In
pattern 3, a crash cymbal hit is added to the beat at the beginning. Pattern 4
plays a drum break.

The JSON code to describe this looks like this:

```json
{
  "type": {
    "rotary1": {
      "0": {
        "beat": 127
      },
      "43": {
        "beat": 127,
        "fill": 127
      },
      "85": {
        "beat": 127,
        "hit": 127
      },
      "127": {
        "break": 127
      }
    }
  }
}
```

#### channels.elements.texture

The _texture_ element descibes how melodic and harmonic materials are combined
in the channel (see
[Wikipedia](<https://en.wikipedia.org/wiki/Texture_(music)>)). While music
theory describes a lot more kinds of textures, for the sake of describing our
music to Zapperment, we'll just use these two basic ones:

| Name       | Key            |
| ---------- | -------------- |
| Monophonic | `"monophonic"` |
| Polyphonic | `"polyphonic"` |

- Use _monophonic_ for channels that play single melodic line, only one note at
  a time
- Use _polyphonic_ for channels that play single melodic line, only one note at
  a time

Similar to the [channels.elements.timbre](#channelselementstimbre) element, the
_texture_ element is a JSON object with keys that correspond to the keys in the
table above and values that rate how much this channel corresponds to the
texture on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

#### channels.elements.rhythm

The _rhythm_ element describes the kind of rhythm this channel is playing.

| Name     | Key          |
| -------- | ------------ |
| Groovy   | `"groovy"`   |
| Shuffled | `"shuffled"` |
| Straight | `"straight"` |

- Use _groovy_ for channels that play a rhythm where the notes are not exactly
  aligned to a grid of sixteenth notes, but intentionally a bit “off”, to create
  a human feel, together with slight velocity variations; this is typically done
  with Reason's (see
  [Wikipedia](<https://en.wikipedia.org/wiki/Groove_(music)>))
  [ReGroove Mixer](https://www.reasonstudios.com/en/reason/recording/regroove),
  or a musician played a groovy piece of music or drum pattern live, without
  quantization applied
- Use _shuffled_ for channels where more or less shuffle is applied to the
  sixteenth notes from a sequencer or drum machine; this is similar to groove,
  but more mechanical and less humanized; most sequencers or drum machines have
  a shuffle setting
  ([PolyStep Sequencer](https://www.reasonstudios.com/en/reason/players/polystep-sequencer),
  [Drum Sequencer](https://www.reasonstudios.com/en/reason/players/drum-sequencer),
  [Matrix](https://www.reasonstudios.com/en/reason/recording/matrix),
  [ReDrum](https://www.reasonstudios.com/en/reason/instruments/redrum))
- Use _straight_ for channels where the rhythm is _not_ groovy or shuffled, i.e.
  notes are strictly quantized

Similar to the [channels.elements.timbre](#channelselementstimbre) element, the
_rhythm_ element is a JSON object with keys that correspond to the keys in the
table above and values that rate how much this channel corresponds to the rhythm
on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

#### channels.elements.mood

The _mood_ element describes the mood, atmosphere, feeling that the sound played
by a channel creates. This is the most unscientific, subjective element, but
possibly also the most powerful, if the producers of Zapperment tracks get it
right.

| Value       | Key             |
| ----------- | --------------- |
| Aggressive  | `"Aggressive"`  |
| Agitated    | `"agitated"`    |
| Busy        | `"busy"`        |
| Confusing   | `"confusing"`   |
| Depressing  | `"depressing"`  |
| Dramatic    | `"dramatic"`    |
| Erotic      | `"erotic"`      |
| Euphoric    | `"euphoric"`    |
| Happy       | `"happy"`       |
| Hectic      | `"hectic"`      |
| Heroic      | `"heroic"`      |
| Hypnotic    | `"hypnotic"`    |
| Meditative  | `"meditative"`  |
| Melancholic | `"melancholic"` |
| Peaceful    | `"peaceful"`    |
| Psychedelic | `"psychedelic"` |
| Relaxed     | `"relaxed"`     |
| Sad         | `"sad"`         |
| Scary       | `"scary"`       |
| Serene      | `"serene"`      |
| Stressful   | `"stressful"`   |

Similar to the [channels.elements.timbre](#channelselementstimbre) element, the
_rhythm_ element is a JSON object with keys that correspond to the keys in the
table above and values that rate how much this channel corresponds to the rhythm
on a scale from 0-127.

- Type: object
- Required (no default)
- Controllable: yes

# Addendum

## Value Scale from 0 to 127

Most numerical values used for Zapperment track definitions are integers from 0
to 127. This has historical reasons: the MIDI standard uses 7 bits for
transmitting controller data, which allows for 128 distinct values. To continue
the tradition and to make controlling Reason with MIDI easier, most instrument
settings in Reason use this number range, as well, including the Combinator's
rotary knobs. If you crank a Combinator rotary all the way up and hover the
mouse over it, it will show you that the knob is set to value 127.

The downside of this is that sometimes you have to ponder: “Hm, if I set this
knob to 75% percent, what value would that be? Umm... 128 divided by four,
multiplied by three, minus one…“

To spare you too much calculating in your head, here's a handy table:

| Value | Percentage | Description        |
| ----- | ---------- | ------------------ |
| 0     | 0%         | nought             |
| 15    | 12.5%      | ⅛ – one eighth     |
| 31    | 25%        | ¼ – one quarter    |
| 47    | 37.5%      | ⅜ – three eighths  |
| 63    | 50%        | ½ – half           |
| 79    | 62.5%      | ⅝ – five eighths   |
| 95    | 75%        | ¾ – three quarters |
| 111   | 87.5%      | ⅞ – seven eighths  |
| 127   | 100%       | full               |

## Timbres

For setting the [channels.elements.timbre](#channelselementstimbre) element of
channels in the Zapperment configuration, use the values in the list below.
These are based on the instruments of the
[General MIDI standard](https://en.wikipedia.org/wiki/General_MIDI), with some
changes and additions.

### Piano

| Name                   | Key                      |
| ---------------------- | ------------------------ |
| Acoustic Piano         | `"acousticPiano"`        |
| Electric Piano         | `"electricPiano"`        |
| Digital Electric Piano | `"digitalElectricPiano"` |
| Harpsichord            | `"harpsichord"`          |
| Clavinet               | `"clavinet"`             |

### Chromatic Percussion

| Name          | Key              |
| ------------- | ---------------- |
| Celesta       | `"celesta"`      |
| Glockenspiel  | `"glockenspiel"` |
| Music Box     | `"music Box"`    |
| Vibraphone    | `"vibraphone"`   |
| Marimba       | `"marimba"`      |
| Xylophone     | `"xylophone"`    |
| Tubular Bells | `"tubularBells"` |
| Dulcimer      | `"dulcimer"`     |

### Organ

| Name            | Key                |
| --------------- | ------------------ |
| Rock Organ      | `"rockOrgan"`      |
| Church Organ    | `"churchOrgan"`    |
| Accordion       | `"accordion"`      |
| Harmonica       | `"harmonica"`      |
| Tango Accordion | `"tangoAccordion"` |

### Guitar

| Name                  | Key                     |
| --------------------- | ----------------------- |
| Nylon Acoustic Guitar | `"nylonAcousticGuitar"` |
| Steel Acoustic Guitar | `"steelAcousticGuitar"` |
| Clean Electric Guitar | `"cleanElectricGuitar"` |
| Muted Electric Guitar | `"mutedElectricGuitar"` |
| Overdriven Guitar     | `"overdrivenGuitar"`    |
| Guitar Harmonics      | `"guitarHarmonics"`     |
| Guitar Fret Noise     | `"guitarFretNoise"`     |

### Bass

| Name                   | Key                      |
| ---------------------- | ------------------------ |
| Acoustic Bass          | `"acousticBass"`         |
| Fingered Electric Bass | `"fingeredElectricBass"` |
| Picked Electric Bass   | `"pickedElectricBass"`   |
| Fretless Bass          | `"fretlessBass"`         |
| Slap Bass              | `"slapBass"`             |
| Bass Fret Noise        | `"bassFretNoise"`        |
| Analogue Synth Bass    | `"analogueSynthBass"`    |
| Digital Synth Bass     | `"digitalSynthBass"`     |

### Strings

| Name              | Key                  |
| ----------------- | -------------------- |
| Violin            | `"violin"`           |
| Viola             | `"viola"`            |
| Cello             | `"cello"`            |
| Contrabass        | `"contrabass"`       |
| Tremolo Strings   | `"tremoloStrings"`   |
| Pizzicato Strings | `"pizzicatoStrings"` |
| Orchestral Harp   | `"orchestralHarp"`   |
| Timpani           | `"timpani"`          |

### Ensemble

| Name            | Key                |
| --------------- | ------------------ |
| String Ensemble | `"stringEnsemble"` |
| Synth Strings   | `"synthStrings"`   |
| Synth Choir     | `"synthChoir"`     |
| Orchestra Hit   | `"orchestraHit"`   |

### Voice

| Name                | Key                 |
| ------------------- | ------------------- |
| Female Solo Voice   | `"femaleSoloVoice"` |
| Male Solo Voice     | `"maleSoloVoice"`   |
| Child Solo Voice    | `"childSoloVoice"`  |
| Falsetto Solo Voice | `"falsettoVoice"`   |
| Women's Choir       | "`womensChoir`"     |
| Men's Choir         | "`mensChoir`"       |
| Mixed Choir         | "`mixedChoir`"      |
| Children's Choir    | "`childrensChoir`"  |

### Brass

| Name          | Key              |
| ------------- | ---------------- |
| Trumpet       | `"trumpet"`      |
| Trombone      | `"trombone"`     |
| Tuba          | `"tuba"`         |
| Muted Trumpet | `"mutedTrumpet"` |
| French Horn   | `"frenchHorn"`   |
| Brass Section | `"brassSection"` |
| Synth Brass   | `"synthBrass"`   |

### Reed

| Name         | Key             |
| ------------ | --------------- |
| Soprano Sax  | `"sopranoSax"`  |
| Alto Sax     | `"altoSax"`     |
| Tenor Sax    | `"tenorSax"`    |
| Baritone Sax | `"baritoneSax"` |
| Oboe         | `"oboe"`        |
| English Horn | `"englishHorn"` |
| Bassoon      | `"bassoon"`     |
| Clarinet     | `"clarinet"`    |

### Pipe

| Name         | Key             |
| ------------ | --------------- |
| Piccolo      | `"piccolo"`     |
| Flute        | `"flute"`       |
| Recorder     | `"recorder"`    |
| Pan Flute    | `"panFlute"`    |
| Blown Bottle | `"blownBottle"` |
| Shakuhachi   | `"shakuhachi"`  |
| Whistle      | `"whistle"`     |
| Ocarina      | `"ocarina"`     |

### Synth Lead

| Name          | Key              |
| ------------- | ---------------- |
| Square Lead   | `"squareLead"`   |
| Sawtooth Lead | `"sawtoothLead"` |
| Calliope Lead | `"calliopeLead"` |
| Chiff Lead    | `"chiffLead"`    |
| Charang Lead  | `"charangLead"`  |
| Voice Lead    | `"voiceLead"`    |
| Fifth Lead    | `"fifthLead"`    |

### Synth Pad

| Name          | Key              |
| ------------- | ---------------- |
| New Age Pad   | `"newAgePad"`    |
| Warm Pad      | `"warmPad"`      |
| Polysynth Pad | `"polysynthPad"` |
| Choir Pad     | `"choirPad"`     |
| Bowed Pad     | `"bowedPad"`     |
| Metallic Pad  | `"metallicPad"`  |
| Halo Pad      | `"haloPad"`      |
| Sweep Pad     | `"sweepPad"`     |

### Ethnic

| Name     | Key          |
| -------- | ------------ |
| Sitar    | `"sitar"`    |
| Banjo    | `"banjo"`    |
| Shamisen | `"shamisen"` |
| Koto     | `"koto"`     |
| Kalimba  | `"kalimba"`  |
| Bagpipe  | `"bagpipe"`  |
| Fiddle   | `"fiddle"`   |
| Shanai   | `"shanai"`   |

### Percussive

| Name           | Key               |
| -------------- | ----------------- |
| Tinkle Bell    | `"tinkleBell"`    |
| Steel Drums    | `"steelDrums"`    |
| Woodblock      | `"woodblock"`     |
| Taiko Drum     | `"taikoDrum"`     |
| Melodic Tom    | `"melodicTom"`    |
| Synth Drum     | `"synthDrum"`     |
| Reverse Cymbal | `"reverseCymbal"` |

### Sound Effects

| Name                 | Key                    |
| -------------------- | ---------------------- |
| Voice Sample         | `"voiceSample"`        |
| Synth Sound Effect   | `"synthSoundEffect"`   |
| Natural Sound Effect | `"naturalSoundEffect"` |
| Noise                | `"noise"`              |

### Drums and Percussion

| Name          | Key              |
| ------------- | ---------------- |
| Bass Drum     | `"bassDrum"`     |
| Rimshot       | `"rimshot"`      |
| Snare Drum    | `"snareDrum"`    |
| Hand Clap     | `"handClap"`     |
| Tom-tom       | `"tomTom"`       |
| Closed Hi-Hat | `"closedHiHat"`  |
| Open Hi-Hat   | `"openHiHat"`    |
| Crash Cymbal  | `"crashCymbal"`  |
| Ride Cymbal   | `"rideCymbal"`   |
| Ride Bell     | `"rideBell"`     |
| Splash Cymbal | `"splashCymbal"` |
| Tamborine     | `"tamborine"`    |
| Cowbell       | `"cowbell"`      |
| Vibra Slap    | `"vibraSlap"`    |
| Bongo         | `"bongo"`        |
| Conga         | `"conga"`        |
| Timbale       | `"timbale"`      |
| Agogô         | `"agogo"`        |
| Cabasa        | `"cabasa"`       |
| Maracas       | `"maracas"`      |
| Whistle       | `"whistle"`      |
| Güiro         | `"guiro"`        |
| Claves        | `"claves"`       |
| Wood Block    | `"woodBlock"`    |
| Cuíca         | `"cuica"`        |
| Triangle      | `"triangle"`     |

## Note Names

For defining the [pitch element](#channelselementspitch) of a channel, use the
musical note from C to B, combined with the octave from -2 to 8. This
corresponds to the MIDI standard.

| Value    | Description  |
| -------- | ------------ |
| `"C-2"`  | MIDI note 0  |
| `"C#-2"` | MIDI note 1  |
| `"D-2"`  | MIDI note 2  |
| `"D#-2"` | MIDI note 3  |
| `"E-2"`  | MIDI note 4  |
| `"F-2"`  | MIDI note 5  |
| `"F#-2"` | MIDI note 6  |
| `"G-2"`  | MIDI note 7  |
| `"G#-2"` | MIDI note 8  |
| `"A-2"`  | MIDI note 9  |
| `"A#-2"` | MIDI note 10 |
| `"B-2"`  | MIDI note 11 |

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

## Colors

Use one of the 32 “Reason colors” in [channels.meta.color](#channelsmetacolor)
to determine what the channel looks like in the Reason rack:

| Color                                                                                                                                  | Value                |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ![Burgundy](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-burgundy.png)                 | `"Burgundy"`         |
| ![Red](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-red.png)                           | `"Red"`              |
| ![Orange](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-orange.png)                     | `"Orange"`           |
| ![Brown](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-brown.png)                       | `"Brown"`            |
| ![Ochre](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-ochre.png)                       | `"Ochre"`            |
| ![Peach](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-peach.png)                       | `"Peach"`            |
| ![Wheat](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-wheat.png)                       | `"Wheat"`            |
| ![Tangerine](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-tangerine.png)               | `"Tangerine"`        |
| ![Pineapple](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-pineapple.png)               | `"Pineapple"`        |
| ![Lemon](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-lemon.png)                       | `"Lemon"`            |
| ![Bright Lime](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-bright-lime.png)           | `"Bright Lime"`      |
| ![Light Olive](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-light-olive.png)           | `"Light Olive"`      |
| ![Moss Green](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-moss-green.png)             | `"Moss Green"`       |
| ![Kelly Green](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-kelly-green.png)           | `"Kelly Green"`      |
| ![Asparagus](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-asparagus.png)               | `"Asparagus"`        |
| ![Dark Green](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-dark-green.png)             | `"Dark Green"`       |
| ![Camouflage Green](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-camouflage-green.png) | `"Camouflage Green"` |
| ![Turquoise](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-turquoise.png)               | `"Turquoise"`        |
| ![Blue in Green](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-blue-in-green.png)       | `"Blue in Green"`    |
| ![Powder Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-powder-blue.png)           | `"Powder Blue"`      |
| ![Light Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-light-blue.png)             | `"Light Blue"`       |
| ![Sky Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-sky-blue.png)                 | `"Sky Blue"`         |
| ![Steel Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-steel-blue.png)             | `"Steel Blue"`       |
| ![Slate Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-slate-blue.png)             | `"Slate Blue"`       |
| ![Dark Blue](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-dark-blue.png)               | `"Dark Blue"`        |
| ![Pink](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-pink.png)                         | `"Pink"`             |
| ![Lilac](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-lilac.png)                       | `"Lilac"`            |
| ![Plum](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-plum.png)                         | `"Plum"`             |
| ![Neon Violet](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-neon-violet.png)           | `"Neon Violet"`      |
| ![Deep Purple](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-deep-purple.png)           | `"Deep Purple"`      |
| ![Graphite](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-graphite.png)                 | `"Graphite"`         |
| ![Bright Grey](https://github.com/technology-ebay-de/zapperment/blob/master/assets/wiki-images/reason-color-bright-grey.png)           | `"Bright Grey"`      |
