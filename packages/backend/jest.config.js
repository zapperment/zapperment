module.exports = {
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  // disable Babel completely, we don't need it
  transformIgnorePatterns: ['.*']
};
