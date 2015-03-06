'use strict';

const express = require('express');
const handlers = require('../handlers/places');

const router = express();

module.exports = function(path) {
  router.route(path)
    .get(handlers.getAll);

  return router;
};
