const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const options = { useNewUrlParser: true };

module.exports = {
  init: callback => {
    mongo.connect(url, options, (err, client) => {
      const db = client.db('zapperment');
      module.exports.db = db;
      callback(err);
    });
  },
};
