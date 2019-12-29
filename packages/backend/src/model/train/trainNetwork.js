const brain = require("brain.js");

module.exports = normalizedData => {
  console.log(`Training neural network with ${normalizedData.length} loops`);
  const start = Date.now();
  const net = new brain.NeuralNetwork({ hiddenLayers: [5, 5] });
  net.train(normalizedData);
  console.log(`Done in ${Date.now() - start} ms`);
  return net.toFunction();
};
