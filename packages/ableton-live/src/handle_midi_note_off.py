# MIDI note of commands are used by Zapperment to stop clips in tracks.

from midi_utils import *


def handle_midi_note_off(self, midi_bytes):
    (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
    if midi_event_type != midi_event_type_note_off:
        return
    note = midi_bytes[1]
    if note != 0 and note != 64:
        self.log_dev('Ignoring MIDI note off, it is not 0 or 64')
        return
    track = get_track_from_midi_channel(midi_bytes)
    tracks = self.app.get_document().tracks
    if len(tracks) <= track:
        self.log_dev('Ignoring MIDI note off, track ' + str(track + 1) + ' does not exist')
        return
    self.log_dev('Stopping track ' + str(track + 1))
    tracks[track].stop_all_clips()
