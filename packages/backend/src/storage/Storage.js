const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = class {
  #db = null;

  init() {
    return new Promise((resolve, reject) =>
      mongo.connect(url, options, (err, client) => {
        if (err) {
          reject(err);
          return;
        }
        this.#db = client.db("zapperment");
        resolve();
      })
    );
  }

  async saveLoop(loop) {
    await this.#db.collection("loops").insertOne({
      ...loop,
      _id: Date.now()
    });
  }
};
