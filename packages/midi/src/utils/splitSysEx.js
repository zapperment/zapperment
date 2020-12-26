/**
 * MIDI system exclusive messages consist of:
 * Status byte – byte one, being 0xF0 to identify the sys ex message
 * Manufacturer ID – byte 2 OR bytes 2-4 IF byte 0 is 0x0
 * Data – subsequent bytes
 * Sys ex end byte – the last byte, being 0xF7 to identify the end of the sys ex message
 */
module.exports = message => {
  const manufacturerIdLength = message[1] === 0x0 ? 3 : 1;
  return {
    manufacturerId: message.slice(1, manufacturerIdLength + 1),
    data: message.slice(manufacturerIdLength + 1, message.length - 1)
  };
};
