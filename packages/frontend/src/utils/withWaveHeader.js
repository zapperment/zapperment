function concat(buffer1, buffer2) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

  return tmp.buffer;
}

export default (data, numberOfChannels = 2, sampleRate = 44100) => {
  const header = new ArrayBuffer(44);

  const d = new DataView(header);

  d.setUint8(0, "R".charCodeAt(0));
  d.setUint8(1, "I".charCodeAt(0));
  d.setUint8(2, "F".charCodeAt(0));
  d.setUint8(3, "F".charCodeAt(0));

  d.setUint32(4, data.byteLength / 2 + 44, true);

  d.setUint8(8, "W".charCodeAt(0));
  d.setUint8(9, "A".charCodeAt(0));
  d.setUint8(10, "V".charCodeAt(0));
  d.setUint8(11, "E".charCodeAt(0));
  d.setUint8(12, "f".charCodeAt(0));
  d.setUint8(13, "m".charCodeAt(0));
  d.setUint8(14, "t".charCodeAt(0));
  d.setUint8(15, " ".charCodeAt(0));

  d.setUint32(16, 16, true);
  d.setUint16(20, 1, true);
  d.setUint16(22, numberOfChannels, true);
  d.setUint32(24, sampleRate, true);
  d.setUint32(28, sampleRate * 2);
  d.setUint16(32, numberOfChannels * 2);
  d.setUint16(34, 16, true);

  d.setUint8(36, "d".charCodeAt(0));
  d.setUint8(37, "a".charCodeAt(0));
  d.setUint8(38, "t".charCodeAt(0));
  d.setUint8(39, "a".charCodeAt(0));
  d.setUint32(40, data.byteLength, true);

  return concat(header, data);
};
