const { databaseUrl } = require("../config");
const mongo = require("mongodb").MongoClient;

/* ----- CONSTANTS ----- */

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const loopsCollection = "loops";
const zappermentDb = "zapperment";

module.exports = class {
  /* ----- PRIVATE FIELDS ----- */

  #db = null;

  /* ----- PUBLIC METHODS ----- */

  async init() {
    const client = await mongo.connect(databaseUrl, options);
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
