module.exports = value =>
  typeof value === "string" &&
  /^(([ACDFG]#?|[BE])[-[12]|([ACDFG]#?|[BE])[0-7]|([CDF]#?|E)8|G8)/.test(value);
