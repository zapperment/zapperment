const mongo = require("mongodb").MongoClient;
const { parseSelectorExpression } = require("./utils");

/* ----- CONSTANTS ----- */

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const loopsCollection = "loops";
const zappermentDb = "zapperment";

module.exports = class {
  /* ----- PRIVATE FIELDS ----- */

  #db = null;

  /* ----- PUBLIC METHODS ----- */

  async init({ databaseUrl }) {
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
  loadLoops(selectorExpression) {
    return this.#db
      .collection(loopsCollection)
      .find(parseSelectorExpression(selectorExpression))
      .toArray();
  }

  get loops() {
    return this.#db.collection(loopsCollection);
  }

  async getMaxNumberOfTags() {
    const result = await this.loops
      .aggregate([
        {
          $project: { _id: 0, count: { $size: "$tags" } }
        }
      ])
      .toArray();

    // The free Atlas plan won't allow us to create a max aggregation
    // so we have to get the maximum number of tags locally here
    return result.reduce(
      (max, { count }) => (count > max ? count : max),
      0
    );
  }
};
