const printChannelName = context =>
  context.track && context.track.name
    ? `\nChannel: ${context.track.name}`
    : "";

const printChannelProperty = context =>
  context.track && context.track.property
    ? `\nProperty: ${context.track.property}`
    : "";

module.exports = (error, context) =>
  console.error(
    `Error: ${error.message}\nTrack: ${context.title}${printChannelName(
      context
    )}${printChannelProperty(context)}`
  );
