'use strict';

const express = require('express');
const handlers = require('../handlers/signup');

const router = express();

module.exports = function(path) {
  router.route(path)
    .post(handlers.create)

  return router;
};
