const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const loopsCollection = "loops";
const zappermentDb = "zapperment";

module.exports = class {
  #db = null;

  async init() {
    const client = await mongo.connect(url, options);
    this.#db = client.db(zappermentDb);
  }

  // async, returns a promise
  saveLoop(loop) {
    return this.#db.collection(loopsCollection).insertOne({
      ...loop,
      _id: Date.now()
    });
  }

  // async, returns a promise resolving to docs
  loadLoops() {
    return this.#db
      .collection(loopsCollection)
      .find({})
      .toArray();
  }
};
