const express = require('express');

const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Server is cooking here!');
});

router.use('/', authRouter);

module.exports = router;
