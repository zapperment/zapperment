module.exports = class {
  #options = null;
  constructor(options) {
    this.#options = options;
  }
  init(properties) {
    Object.entries(this.#options).forEach(([name, value]) => {
      if (value === undefined) {
        return;
      }
      properties[name] = value;
    });
  }
};
