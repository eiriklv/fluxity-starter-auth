'use strict';

const express = require('express');

const router = express();

require('./passport-init');

router.use(require('./routes/session')('/session'));
router.use(require('./routes/signup')('/signup'));

module.exports = router;
