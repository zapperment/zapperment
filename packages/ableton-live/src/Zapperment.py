import Live
from _Framework.ControlSurface import ControlSurface

from handle_midi_control_change import *
from handle_midi_note_off import *
from handle_midi_note_on import *
from midi_utils import *


class Zapperment(ControlSurface):
    __module__ = __name__
    __doc__ = "Zapperment Interface"

    name = "Zapperment"

    def __init__(self, c_instance, *a, **k):
        super(Zapperment, self).__init__(c_instance, *a, **k)
        self.c_instance = c_instance
        self.app = self.application()

        self.log(
            'Live version ' +
            str(self.app.get_major_version()) +
            '.' +
            str(self.app.get_minor_version()))

        with self.component_guard():
            self._suggested_input_port = 'Zapperment'
            self._suggested_output_port = 'Zapperment'

        self.log('Control surface version ' + software_version)
        self.show_message("Zapperment control surface version: " + software_version)
        self.log_dev("Ready!")

    def log_dev(self, msg):
        if is_dev_mode:
            self.log(msg)

    def log(self, msg):
        self.c_instance.log_message("Zapperment - " + msg)

    def build_midi_map(self, midi_map_handle):
        self.log_dev('Building MIDI map')
        script_handle = self.c_instance.handle()
        for channel in range(15):
            for note_or_control in range(128):
                Live.MidiMap.forward_midi_note(script_handle, midi_map_handle, channel, note_or_control, False)
                Live.MidiMap.forward_midi_cc(script_handle, midi_map_handle, channel, note_or_control, False)

    def receive_midi(self, midi_bytes):
        self.log_dev('Received MIDI ' + str(midi_bytes))
        (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
        track = get_track_from_midi_channel(midi_bytes)
        self.log_dev('Type:              ' + midi_event_type)
        self.log_dev('Channel:           ' + str(midi_channel + 1))
        self.log_dev(('Controller:        '
                  if midi_event_type == midi_event_type_control else 'Note:              ')
                 + str(midi_bytes[1]))
        self.log_dev('Track:             ' + str(track + 1))
        if midi_event_type != midi_event_type_control:
            clip = get_clip_from_midi_note(midi_bytes)
            self.log_dev('Clip:              ' + str(clip + 1))
        handle_midi_note_on(self, midi_bytes)
        handle_midi_note_off(self, midi_bytes)
        handle_midi_control_change(self, midi_bytes)
