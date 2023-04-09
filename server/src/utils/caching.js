const NodeCache = require("node-cache");
const cache = new NodeCache();

const getCaching = (keys) => {
  const cached = cache.get(keys);

  const arrayFromCache = cached ? cached : [];

  return arrayFromCache;
};

const setCaching = (keys, values, ttl) => {
  cache.set(keys, values, ttl);
};

const delCeche = (keys) => {
  keys.forEach((key) => {
    cache.del(key);
  });
};

module.exports = { getCaching, setCaching, delCeche };
