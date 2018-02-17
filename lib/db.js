const config = require('../config/app.js')();
const l = require('../lib/logger.js');
const redis = require('redis');
let client = null;

function DataSource() {
  client = redis.createClient({ host: config.redis.host, post: config.redis.port, db: config.redis.db });
}


DataSource.prototype.setData = function setData (score, value) {
  return new Promise((resolve, reject) => {
    const key = [config.redis.key, score, value];
    client.zadd(key, (err, result) => {
      if (err) {
        l.error(err);
        return reject(err);
      }
      l.info('Data added to redis', key);
      resolve(result);
    });
  });
};

DataSource.prototype.findByRange = function findByRange (max, min) {
  return new Promise((resolve, reject) => {
    if (!max) {
      l.error('max value is required');
      return reject(new Error('max value required'));
    }
    const args = [config.redis.key, max, min ? min : '0'];
    return client.zrevrangebyscore(args, (err, result) => {
      if (err) {
        l.error(err);
        return reject(err);
      }
      l.debug('selected data', args, result);
      resolve(result);
    });
  });
};

DataSource.prototype.removeItems = function removeItems (items) {
  return new Promise((resolve, reject) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      l.warn('Sended data is not an array or this array is empty');
      return resolve(null);
    }
    const cleanKey = [config.redis.key].concat(items);
    client.multi()
      .zrem(cleanKey)
      .exec((err, result) => {
        if (err) {
          l.error(err);
          return reject(err);
        }
        l.debug('all items deleted', cleanKey, result);
        resolve(items);
      });
  });
};

module.exports = new DataSource();
