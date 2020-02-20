import Live
from _Framework.ControlSurface import ControlSurface

from midi_utils import *


class Zapperment(ControlSurface):
    __module__ = __name__
    __doc__ = "Zapperment Interface"

    name = "Zapperment"

    def __init__(self, c_instance, *a, **k):
        super(Zapperment, self).__init__(c_instance, *a, **k)
        self.c_instance = c_instance
        self.app = self.application()
        song = self.app.get_document()
        self.log('Number of tracks: ' + str(len(song.tracks)))
        self.log('Number of clip slots in track 1: ' + str(len(song.tracks[0].clip_slots)))

        self.log(
            'Live version ' +
            str(self.app.get_major_version()) +
            '.' +
            str(self.app.get_minor_version()))

        with self.component_guard():
            self._suggested_input_port = 'Zapperment'
            self._suggested_output_port = 'Zapperment'

        self.log("Ready!")

        self.log('Control surface version ' + str(software_version))
        self.show_message("Zapperment control surface version: " + str(software_version))

    def log(self, msg):
        self.c_instance.log_message("Zapperment - " + msg)

    def build_midi_map(self, midi_map_handle):
        self.log('Building MIDI map')
        script_handle = self.c_instance.handle()
        for channel in range(15):
            for note_or_control in range(128):
                Live.MidiMap.forward_midi_note(script_handle, midi_map_handle, channel, note_or_control, False)
                Live.MidiMap.forward_midi_cc(script_handle, midi_map_handle, channel, note_or_control, False)

    def receive_midi(self, midi_bytes):
        self.log('Received MIDI ' + str(midi_bytes))
        (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
        track = get_track_from_midi_channel(midi_bytes)
        self.log('Type:              ' + midi_event_type)
        self.log('Channel:           ' + str(midi_channel + 1))
        self.log(('Controller:        '
                  if midi_event_type == midi_event_type_control else 'Note:              ')
                 + str(midi_bytes[1]))
        self.log('Track:             ' + str(track + 1))
        if midi_event_type != midi_event_type_control:
            clip = get_clip_from_midi_note(midi_bytes)
            self.log('Clip:              ' + str(clip + 1))
        self.handle_midi_note_on(midi_bytes)
        self.handle_midi_note_off(midi_bytes)

    def handle_midi_note_on(self, midi_bytes):
        (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
        if midi_event_type != midi_event_type_note_on:
            return
        track = get_track_from_midi_channel(midi_bytes)
        tracks = self.app.get_document().tracks
        if len(tracks) <= track:
            self.log('Ignoring note on, track ' + str(track + 1) + ' does not exist')
            return
        clip = get_clip_from_midi_note(midi_bytes)
        clips = tracks[track].clip_slots
        if len(clips) <= clip:
            self.log('Ignoring note on, track ' + str(track + 1) + ' does not have a clip ' + str(clip + 1))
            return
        self.log('Firing clip!')
        clips[clip].fire()

    def handle_midi_note_off(self, midi_bytes):
        (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
        if midi_event_type != midi_event_type_note_off:
            return
        note = midi_bytes[1]
        if note != 0 and note != 64:
            self.log('Ignoring note off, it is not 0 or 64')
            return
        track = get_track_from_midi_channel(midi_bytes)
        tracks = self.app.get_document().tracks
        if len(tracks) <= track:
            self.log('Ignoring note off, track ' + str(track + 1) + ' does not exist')
            return
        self.log('Stopping clip!')
        tracks[track].stop_all_clips()

