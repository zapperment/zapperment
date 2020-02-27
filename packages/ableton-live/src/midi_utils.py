import math

from consts import *


def is_valid_midi_channel(channel):
    return channel >= 0 and channel <= 15


def is_midi_note_on(midi_bytes):
    return is_valid_midi_channel(midi_bytes[0] - midi_note_on_offset)


def is_midi_note_off(midi_bytes):
    return is_valid_midi_channel(midi_bytes[0] - midi_note_off_offset)


def is_midi_control(midi_bytes):
    return is_valid_midi_channel(midi_bytes[0] - midi_control_offset)


def get_midi_event_type_and_channel(midi_bytes):
    if is_midi_note_on(midi_bytes):
        return midi_event_type_note_on, midi_bytes[0] - midi_note_on_offset
    if is_midi_note_off(midi_bytes):
        return midi_event_type_note_off, midi_bytes[0] - midi_note_off_offset
    if is_midi_control(midi_bytes):
        return midi_event_type_control, midi_bytes[0] - midi_control_offset


def get_track_from_midi_channel(midi_bytes):
    (type, channel) = get_midi_event_type_and_channel(midi_bytes)
    note_or_controller = midi_bytes[1]
    return int(2 * channel + math.ceil(note_or_controller / 64))


def get_clip_from_midi_note(midi_bytes):
    note = midi_bytes[1]
    return int(note - (64 * math.floor(note / 64)))

