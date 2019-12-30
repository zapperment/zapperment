/**
 * Creates an array with 128 elements, containing the numbers 0 to 127, 
 * which are the range of values that can be sent with a MIDI controller 
 * command.
 */
module.exports = () => Array.from({ length: 128 }, (_, i) => i);
