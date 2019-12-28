const reduceNestedSum = require("./reduceNestedSum");
const getNestedAverage = require("./getNestedAverage");

module.exports = (data, path) => {
  const avg = getNestedAverage(data, path);
  return reduceNestedSum(
    (acc, curr, i, arr) =>
      i < arr.length - 1
        ? acc + Math.pow(curr - avg, 2)
        : (acc + Math.pow(curr - avg, 2)) / arr.length,
    0
  )(data, path);
};

const data = [
  { elements: { volume: 2 } },
  { elements: { volume: 4 } },
  { elements: { volume: 4 } },
  { elements: { volume: 4 } },
  { elements: { volume: 5 } },
  { elements: { volume: 5 } },
  { elements: { volume: 7 } },
  { elements: { volume: 9 } }
];

const vari = module.exports(data, "elements.volume");
vari;
