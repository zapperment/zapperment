const brain = require("brain.js");
const { normalize } = require("../normalize");

module.exports = data => {
  const net = new brain.NeuralNetwork();
  const normalizedData = normalize(data);
  net.train(normalizedData);
  console.log(`NEURAL NETWORK TRAINED WITH ${normalizedData.length} LOOPS`);
  return net.toFunction();
};
