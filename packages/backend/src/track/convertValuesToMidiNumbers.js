const { getMidiNote, isNote, isObject } = require("./utils");

const conversion = {
  none: v => v,
  boolean: v => (typeof v !== "boolean" ? v : v ? 127 : 0),
  note: v => (!isNote(v) ? v : getMidiNote(v))
};

const nodesToConvert = {
  playing: conversion.boolean,
  pitch: conversion.note
};

const walk = (value, conversion) => {
  const nextValue = conversion(value);
  if (isObject(nextValue)) {
    for (const [key, value2] of Object.entries(value)) {
      const nextConversion = nodesToConvert[key] || conversion;
      nextValue[key] = walk(value2, nextConversion);
    }
    return nextValue;
  }
  if (Array.isArray(nextValue)) {
    return nextValue.map(value2 => walk(value2, conversion));
  }
  return nextValue;
};

module.exports = trackWithDefaults =>
  walk(JSON.parse(JSON.stringify(trackWithDefaults)), conversion.none);
