const printChannelName = errorInfo =>
  errorInfo.track && errorInfo.track.name
    ? `\nChannel: ${errorInfo.track.name}`
    : "";

const printChannelProperty = errorInfo =>
  errorInfo.track && errorInfo.track.property
    ? `\nProperty: ${errorInfo.track.property}`
    : "";

module.exports = (error, errorInfo) =>
  console.error(
    `Error: ${error.message}\nTrack: ${errorInfo.title}${printChannelName(
      errorInfo
    )}${printChannelProperty(errorInfo)}`
  );
