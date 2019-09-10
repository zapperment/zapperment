const mongo = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = class {
  constructor() {
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      mongo.connect(url, options, (err, client) => {
        if (err) {
          reject(err);
          return;
        }
        this.db = client.db("zapperment");
        resolve();
      });
    });
  }
};
