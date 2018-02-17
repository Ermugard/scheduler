const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true, json: false, level: 'debug', timestamp: true })
  ],
  exitOnError: false
});

logger.d = (msg) => {
  logger.log('debug', msg);
};

logger.e = (msg) => {
  logger.log('error', msg);
};

module.exports = logger;
