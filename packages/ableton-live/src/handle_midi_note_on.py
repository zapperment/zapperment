# MIDI note on commands are used by Zapperment to start clips in a track. Zapperment can control up to
# 64 clips in up to 32 tracks, more is not possible due to limitations of the MIDI protocol.

from midi_utils import *


def handle_midi_note_on(self, midi_bytes):
    (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
    if midi_event_type != midi_event_type_note_on:
        return
    track = get_track_from_midi_channel(midi_bytes)
    tracks = self.app.get_document().tracks
    if len(tracks) <= track:
        self.log_dev('Ignoring MIDI note on, track ' + str(track + 1) + ' does not exist')
        return
    clip = get_clip_from_midi_note(midi_bytes)
    clips = tracks[track].clip_slots
    if len(clips) <= clip:
        self.log_dev('Ignoring MIDI note on, track ' + str(track + 1) + ' does not have a clip ' + str(clip + 1))
        return
    self.log_dev('Firing clip!')
    clips[clip].fire()
