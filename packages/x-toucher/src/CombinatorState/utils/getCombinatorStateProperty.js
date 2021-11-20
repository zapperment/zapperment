// const debug = require("debug")("zapperment:x-toucher:get-device-state-property");

function getCombinatorStateProperty(propertyName, data, previousDevice) {
  return data[propertyName] === undefined
    ? previousDevice[propertyName]
    : data[propertyName];
}

module.exports = getCombinatorStateProperty;
