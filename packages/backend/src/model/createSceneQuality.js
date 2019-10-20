const defaults = {
  startingWithHit: 0,
  playingContinuously: 0,
  endingWithFill: 0,
  rampingUp: 0,
  rampingDown: 0,
  beating: 0,
  percussive: 0,
  hihatty: 0,
  bassy: 0,
  trebly: 0,
  effexy: 0,
  acoustic: 0,
  electric: 0,
  electronic: 0,
  arpeggiating: 0,
  riffing: 0,
  padding: 0,
  soloing: 0,
  filling: 0,
  crooning: 0,
  singing: 0,
  screaming: 0,
  clean: 0,
  distorted: 0
};

module.exports = options => ({ ...defaults, ...options });
