const clocksPerBeat = 24;

module.exports = class {
  constructor(tempo) {
    this.lastTick = process.hrtime.bigint();
    this.interval = BigInt(
      Math.round((60000 / tempo / clocksPerBeat) * 1000000)
    );
  }

  hasTicked() {
    const hasTicked = process.hrtime.bigint() - this.lastTick >= this.interval;
    if (hasTicked) {
      this.lastTick = process.hrtime.bigint();
    }
    return hasTicked;
  }
};
