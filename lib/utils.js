
// var crypto = require('crypto');
const pjson = require('../package.json');
const l = require('./logger.js');

exports.logRequest = (req, res, next) => {
  l.info('=============');
  l.info(req.method, req.url);
  l.debug(req.headers, {});
  l.info('=============');
  next();
};

exports.customHeaders = (req, res, next) => {
  res.setHeader('X-Powered-By', [pjson.author, pjson.name, pjson.version].join(' '));
  res.setHeader('Content-Type', 'application/json');
  res.type('json');
  next();
};
