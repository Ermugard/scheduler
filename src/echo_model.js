const db = require('../lib/db.js');
const l = require('../lib/logger.js');

const EchoModel = {};

EchoModel.addMessage = (message) => {
  const now = new Date();
  const message_date = new Date(message.time);

  if (message_date <= now) {
    console.log(message.message);
    l.info('no need to send it to redis');
    return Promise.resolve(true);
  }

  return db.setData(message_date - 0, message.message)
    .catch((err) => {
      throw err;
    });
};

EchoModel.select_messages = () => {
  console.log(1231231);
  const now = new Date();
  return db.findByRange(now - 0, 0)
    .then((list) => db.removeItems(list))
    .catch((err) => {
      throw err;
    });
};

EchoModel.echo_messages = (list) => {
  if (Array.isArray(list)) {
    list.forEach((item) => {
      console.log(item);
    });
  }
};

module.exports = EchoModel;
