const debug = require("debug")("zapperment:x-toucher:get-device-state-property");

function getDeviceStateProperty(propertyName, data, previousDevice) {
  debug(`Prop name: ${propertyName} – data: ${data[propertyName]} – prev dev: ${previousDevice[propertyName]}`);
  return data[propertyName] === undefined
    ? previousDevice[propertyName]
    : data[propertyName];
}

module.exports = getDeviceStateProperty;
