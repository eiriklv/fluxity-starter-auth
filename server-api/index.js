'use strict';

const express = require('express');

const router = express();

router.use(require('./routes/places-single')('/places/:id'));
router.use(require('./routes/places-all')('/places'));

module.exports = router;
