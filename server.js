const express = require('express');
const app = express();
const router = require('./lib/router.js');
const errorHandler = require('./lib/errors.js');
const pjson = require('./package.json');
const conf = require('./config/app.js')();
const utils = require('./lib/utils.js');
const bodyParser = require('body-parser');

app.use(utils.logRequest);
app.use(utils.customHeaders);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Endpoints
app.use(router);
app.use(errorHandler);

const server = app.listen(conf.port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(
    'app %s listening at http://%s:%s',
    [pjson.author, pjson.name, pjson.version].join(' '),
    host, port);
});
