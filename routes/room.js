const express = require('express');

const passport = require('../lib/passport');
const roomController = require('../controllers/room');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', roomController.create);
router.post('/:roomId', roomController.fight);

module.exports = router;
