const router = require('express').Router();
const echo = require('../src/echo.js');


router.post('/echoAtTime', echo.scheduler);
router.all('*', (req, res, next) => {
  const err = new Error('page not exists');
  err.status = 404;
  next(err);
});

echo.printMessage();

module.exports = router;
