const {
  getNestedAverage,
  getNestedMaximum,
  getNestedMaximumCount,
  getNestedMaximumCountNull,
  getNestedMinimumCount,
  getNestedMinimumCountNull
} = require("./utils");

module.exports = data => {
  const avgClaps = getNestedAverage(data, "stats.claps");
  const maxClaps = getNestedMaximum(data, "stats.claps");
  const maxBoos = getNestedMaximum(data, "stats.boos");
  const minChannels = getNestedMinimumCount(data, "scene.channels");
  const maxChannels = getNestedMaximumCount(data, "scene.channels");
  const minPitchedChannels = getNestedMinimumCount(
    data,
    "scene.channels.elements.pitch"
  );
  const maxPitchedChannels = getNestedMaximumCount(
    data,
    "scene.channels.elements.pitch"
  );
  const minPercussiveChannels = getNestedMinimumCountNull(
    data,
    "scene.channels.elements.pitch"
  );
  const maxPercussiveChannels = getNestedMaximumCountNull(
    data,
    "scene.channels.elements.pitch"
  );
  const maxTotalVolume = getNestedMaximum(
    data,
    "scene.channels.elements.volume"
  );
  avgClaps; //?
  maxClaps; //?
  maxBoos; //?
  minChannels; //?
  maxChannels; //?
  minPitchedChannels; //?
  maxPitchedChannels; //?
  minPercussiveChannels; //?
  maxPercussiveChannels; //?
  maxTotalVolume; //?
};

//==================================================

const normalize = module.exports;
const databaseUrl = "mongodb://localhost:27017";
const mongo = require("mongodb").MongoClient;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const loopsCollection = "loops";
const zappermentDb = "zapperment";

(async () => {
  const client = await mongo.connect(databaseUrl, options);
  const db = client.db(zappermentDb);
  const data = await db
    .collection(loopsCollection)
    .find({})
    .toArray();
  normalize(data);
})();
