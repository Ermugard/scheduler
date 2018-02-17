const l = require('./logger.js');

const ErrorHandler = {};

ErrorHandler.composeError = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (!err.status) {
    l.warn('Service error: no status!', req.url, err, {});
    res.status(404);
    res.send();
    return;
  }


  res.status(err.status);
  res.send({
    'message': err.message,
    'resource': req.url
  });

  l.info('ErrorHandler:', err.status, {
    'message': err.message,
    'resource': req.url
  });
};

module.exports = ErrorHandler.composeError;
