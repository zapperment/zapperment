# Zapperment Test Utilities

Various command line scripts for testing Zapperment.

## MIDI Scripts

### `send_midi_note`

Sends a MIDI note on message and – optionally – a note off message shortly
afterwards.

| parameter    | description                                                        | default value |
| ------------ | ------------------------------------------------------------------ | ------------- |
| port         | Name of the MIDI port to send the message on                       | `Zapperment`  |
| channel      | MIDI channel to send the message on (1-16)                         | `1`           |
| note         | MIDI note number to send (0-127)                                   | `60`          |
| velocity     | MIDI note velocity to send (0-127)                                 | `127`         |
| add-note-off | specify this flag if you want to send a note off after the note on | `false`       |

Example:

```
yarn send_midi_note --channel 2 --note 33 --velocity 82 --add-note-off --port "IAC Driver Bus 1"
```

### `send_midi_note_off`

Sends a MIDI note off message.

| parameter | description                                  | default value |
| --------- | -------------------------------------------- | ------------- |
| port      | Name of the MIDI port to send the message on | `Zapperment`  |
| channel   | MIDI channel to send the message on (1-16)   | `1`           |
| note      | MIDI note number to send (0-127)             | `60`          |
| velocity  | MIDI note velocity to send (0-127)           | `127`         |

Example:

```
yarn send_midi_note_off --channel 2 --note 33 --velocity 82 --port "IAC Driver Bus 1"
```

### `send_midi_cc`

Sends a MIDI control change message.

| parameter | description                                  | default value |
| --------- | -------------------------------------------- | ------------- |
| port      | Name of the MIDI port to send the message on | `Zapperment`  |
| channel   | MIDI channel to send the message on (1-16)   | `1`           |
| control   | MIDI control number to send (0-127)          | `60`          |
| value     | MIDI control change value to send (0-127)    | `127`         |

Example:

```
yarn send_midi_cc --channel 2 --control 33 --value 82 --port "IAC Driver Bus 1"
```

## Scene Scripts

### `send_reason_scene`

Sends a series of MIDI messages to set a scene in Reason.

| parameter | description                                  | default value            |
| --------- | -------------------------------------------- | ------------------------ |
| port      | Name of the MIDI port to send the message on | `Zapperment`             |
| scene     | Scene in JSON format                         | (a typical Reason scene) |

Example:

```
yarn send_reason_scene --scene='[{"track":4,"controller":"button2","value":0}]' --port "IAC Driver Bus 1"
```

## Setting a Default MIDI Port

The test utility scripts have `port` parameters to specify which MIDI interface
to use. If this is not set, the default `Zapperment` is used. If your MIDI port
is called something different and you don't want to specify it every time you
run a test utility script, you can set the environment variable
`ZAPPERMENT_MIDI_PORT`, for example:

```
export ZAPPERMENT_MIDI_PORT="IAC Driver Bus 1"
```
