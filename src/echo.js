const EchoModel = require('./echo_model.js');
const l = require('../lib/logger.js');
const Echo = {};

Echo.scheduler = (req, res, next) => {
  if (!req.body || !req.body.time || !req.body.message) {
    const err = new Error('empty_data');
    err.status = 400;
    return next(err);
  }
  EchoModel.addMessage(req.body)
    .then((result) => {
      res.sendStatus(202);
    })
    .catch((err) => {
      next(err);
    });
};

Echo.printMessage = () => {
  setInterval(() => {
    EchoModel.select_messages()
      .then((list) => EchoModel.echo_messages(list))
      .catch((err) => {
        l.error(err);
      });
  }, 5000);
};

module.exports = Echo;
