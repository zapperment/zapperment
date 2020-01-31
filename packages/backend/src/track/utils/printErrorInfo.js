const printChannelName = errorInfo =>
  errorInfo.channel && errorInfo.channel.name
    ? `\nChannel: ${errorInfo.channel.name}`
    : "";

const printChannelProperty = errorInfo =>
  errorInfo.channel && errorInfo.channel.property
    ? `\nProperty: ${errorInfo.channel.property}`
    : "";

module.exports = (error, errorInfo) =>
  console.error(
    `Error: ${error.message}\nTrack: ${errorInfo.title}${printChannelName(
      errorInfo
    )}${printChannelProperty(errorInfo)}`
  );
