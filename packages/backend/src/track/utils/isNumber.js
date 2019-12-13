module.exports = value =>
  typeof value === "number" && !isNaN(value) && isFinite(value);

module.exports(666); //?
module.exports(1000 / 0); //?
module.exports(NaN); //?
module.exports({ fick: "sack" }); //?
module.exports(null); //?
module.exports(); //?
module.exports("arsch"); //?
