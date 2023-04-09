const NodeCache = require("node-cache");
const cache = new NodeCache();

const getCaching = (key) => {
  const cached = cache.get(key);

  const arrayFromCache = cached ? cached : [];

  return arrayFromCache;
};

const setCaching = (key, values, ttl) => {
  cache.set(key, values, ttl);
};

const checkKey = (key) => {
  return cache.has(key);
};

const delCeche = (keys) => {
  keys.forEach((key) => {
    cache.del(key);
  });
};

module.exports = { checkKey, getCaching, setCaching, delCeche };
