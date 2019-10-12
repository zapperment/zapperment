const ImmutableData = require("./ImmutableData");

module.exports = class extends ImmutableData {
  #properties = {
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

  constructor(options) {
    super(options);
    this.init(this.#properties)
  }

  get startingWithHit() {
    return this.#properties.startingWithHit;
  }

  get playingContinuously() {
    return this.#properties.playingContinuously;
  }

  get endingWithFill() {
    return this.#properties.endingWithFill;
  }

  get rampingUp() {
    return this.#properties.rampingUp;
  }

  get rampingDown() {
    return this.#properties.rampingDown;
  }

  get beating() {
    return this.#properties.beating;
  }

  get percussive() {
    return this.#properties.percussive;
  }

  get hihatty() {
    return this.#properties.hihatty;
  }

  get bassy() {
    return this.#properties.bassy;
  }

  get trebly() {
    return this.#properties.trebly;
  }

  get effexy() {
    return this.#properties.effexy;
  }

  get acoustic() {
    return this.#properties.acoustic;
  }

  get electric() {
    return this.#properties.electric;
  }

  get electronic() {
    return this.#properties.electronic;
  }

  get arpeggiating() {
    return this.#properties.arpeggiating;
  }

  get riffing() {
    return this.#properties.riffing;
  }

  get padding() {
    return this.#properties.padding;
  }

  get soloing() {
    return this.#properties.soloing;
  }

  get filling() {
    return this.#properties.filling;
  }

  get crooning() {
    return this.#properties.crooning;
  }

  get singing() {
    return this.#properties.singing;
  }

  get screaming() {
    return this.#properties.screaming;
  }

  get clean() {
    return this.#properties.clean;
  }

  get distorted() {
    return this.#properties.distorted;
  }
};
