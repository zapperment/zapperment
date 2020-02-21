# MIDI control changes are used by Zapperment to control parameters of instruments. This is done through
# the macro controls of rack devices. A track must contain a rack or drum rack device to be controllable
# through zapperment.

import Live

from midi_utils import *


def handle_midi_control_change(self, midi_bytes):
    (midi_event_type, midi_channel) = get_midi_event_type_and_channel(midi_bytes)
    if midi_event_type != midi_event_type_control:
        return
    controller = midi_bytes[1]
    if (7 < controller < 64) or controller > 71:
        self.log_dev('Ignoring MIDI control change, it is not in ranges 0-7 or 64-71')
        return
    track = get_track_from_midi_channel(midi_bytes)
    tracks = self.app.get_document().tracks
    if len(tracks) <= track:
        self.log_dev('Ignoring MIDI control change, track ' + str(track + 1) + ' does not exist')
        return
    devices = tracks[track].devices
    self.log_dev('Found ' + str(len(devices)) + ' devices in track ' + str(track + 1))
    if len(devices) != 1:
        self.log_dev(
            'Ignoring MIDI control change, track ' + str(track + 1) + ' must contain exactly one device')
        return
    device = devices[0]
    if not device.type == Live.Device.DeviceType.instrument:
        self.log_dev('Ignoring MIDI control change, device on track ' + str(track + 1) + ' is not an instrument')
        return
    if not device.can_have_chains and not device.can_have_drum_pads:
        self.log_dev(
            'Ignoring MIDI control change, device on track ' + str(track + 1) + ' is not a rack or drum rack')
        return
    if not device.is_active:
        self.log_dev('Ignoring MIDI control change, device on track ' + str(track + 1) + ' is not active')
