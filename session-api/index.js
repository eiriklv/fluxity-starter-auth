'use strict';

var express = require('express');
var router = express();

require('./passport-init');

router.use(require('./routes/session')('/session'));
router.use(require('./routes/signup')('/signup'));

module.exports = router;
