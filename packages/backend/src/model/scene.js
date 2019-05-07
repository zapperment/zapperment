const CHANNEL_COUNT = 9;

const buildChannel = ({ id }) => ({
  id,
  mute: Boolean(id % 2)
});

const buildMixer = () =>
  [...Array(CHANNEL_COUNT).keys()].map(id => buildChannel({ id }));

const buildDefaultScene = () => ({
  mixer: buildMixer()
});

const getRandom = () => Math.floor(Math.random() * CHANNEL_COUNT);

const getTwoDifferentRandomNumbers = () => {
  let a, b;

  do {
    a = getRandom();
    b = getRandom();
  } while (a === b);

  return [a, b];
};

const buildNewScene = prevScene => {

  const alterIds = getTwoDifferentRandomNumbers();

  return {
    ...prevScene,
    mixer: prevScene.mixer.map(channel => {
      if (alterIds.includes(channel.id)) {
        return {
          ...channel,
          mute: !channel.mute
        };
      }

      return channel;
    })
  };
};

module.exports = {
  buildDefaultScene,
  buildNewScene
};
