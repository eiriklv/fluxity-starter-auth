'use strict';

const express = require('express');
const handlers = require('../handlers/places');

const router = express();

exports = module.exports = function(path) {
  router.route(path)
    .get(handlers.get)

  return router;
};
