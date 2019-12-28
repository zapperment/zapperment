const {
  average,
  minimum,
  maximum,
  range,
  sum,
  variance
} = require("./utils");

module.exports = data => {
  // let sumChannels2 = 0;
  // for (const {
  //   scene: { channels }
  // } of data) {
  //   sumChannels2 += channels.length;
  // }
  const varClaps = variance.sum(data, "stats.claps");
  const sumClaps = sum.sum(data, "stats.claps");
  const rangeClaps = range.sum(data, "stats.claps"); //?
  const avgClaps = average.sum(data, "stats.claps");
  const minClaps = minimum.sum(data, "stats.claps"); //?
  const maxClaps = maximum.sum(data, "stats.claps");
  const minBoos = minimum.sum(data, "stats.boos"); //?
  const maxBoos = maximum.sum(data, "stats.boos");
  const sumChannels = sum.count(data, "scene.channels"); //?
  const avgChannels = average.count(data, "scene.channels"); //?
  const minChannels = minimum.count(data, "scene.channels");
  const maxChannels = maximum.count(data, "scene.channels");
  const rangeChannels = range.count(data, "scene.channels"); //?
  const minPitchedChannels = minimum.count(
    data,
    "scene.channels.elements.pitch"
  );
  const maxPitchedChannels = maximum.count(
    data,
    "scene.channels.elements.pitch"
  );
  const minPercussiveChannels = minimum.countNull(
    data,
    "scene.channels.elements.pitch"
  );
  const maxPercussiveChannels = maximum.countNull(
    data,
    "scene.channels.elements.pitch"
  );
  const maxTotalVolume = maximum.sum(data, "scene.channels.elements.volume");
  const maxAverageVolume = average.sum(data, "scene.channels.elements.volume");

  assert(varClaps === 74.06759982638883);
  assert(sumClaps === 1031);
  assert(avgClaps === 10.739583333333334);
  assert(maxClaps === 34);
  assert(maxBoos === 25);
  assert(minChannels === 3);
  assert(maxChannels === 10);
  assert(minPitchedChannels === 1);
  assert(maxPitchedChannels === 7);
  assert(minPercussiveChannels === 1);
  assert(maxPercussiveChannels === 3);
  assert(maxTotalVolume === 555);
  assert(maxAverageVolume === 313.7708333333333);
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
