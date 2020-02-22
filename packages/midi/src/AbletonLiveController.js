const MidiController = require("./MidiController");

const calculateMidiChannelFromTrack = track => Math.ceil(track / 2);
const calculateMidiOffNoteFromTrack = track => (track % 2 ? 0 : 64);
const calculateMidiNoteFromTrackAndClip = (track, clip) =>
  track % 2 ? clip - 1 : clip + 63;
const calculateMidiControlFromTrackAndMacro = (track, macro) =>
  track % 2 ? macro - 1 : macro + 63;

const parseMacroFromControlId = controlId => {
  let macro;
  try {
    [, macro] = controlId.match(/^macro([1-8])$/);
  } catch {
    throw new Error(`Invalid macro identifier: ${controlId}`);
  }
  return parseInt(macro, 10);
};

module.exports = class extends MidiController {
  send(trackId, controlId, value) {
    const track = this.parseTrackId(trackId);
    const midiChannel = calculateMidiChannelFromTrack(track);
    if (controlId === "clip") {
      if (value === 0) {
        const midiNote = calculateMidiOffNoteFromTrack(track);
        console.log(
          `Track ${track}: stopped (MIDI channel ${midiChannel}, midi note ${midiNote} off)`
        );
        super.sendNoteOff(midiChannel, midiNote);
        return;
      }
      const midiNote = calculateMidiNoteFromTrackAndClip(track, value);
      console.log(
        `Track ${track}: firing clip ${value} (MIDI channel ${midiChannel}, note ${midiNote} on)`
      );
      super.sendNoteOn(midiChannel, midiNote);
      return;
    }
    if (controlId.startsWith("macro")) {
      const macro = parseMacroFromControlId(controlId);
      const midiControl = calculateMidiControlFromTrackAndMacro(track, macro);
      console.log(
        `Track ${track}: setting macro ${macro} to ${value} (MIDI channel ${midiChannel}, control ${midiControl})`
      );
      super.sendControlChange(midiChannel, midiControl, value);
      return;
    }
    throw new Error(`Invalid control “${controlId}”`);
  }
};
