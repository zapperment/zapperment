const { databaseUrl } = require("./config");
const { Storage } = require("@zapperment/storage");

module.exports = async () => {
  const storage = new Storage();
  await storage.init({ databaseUrl });
  return storage.loops;
};
