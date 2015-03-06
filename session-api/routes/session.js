'use strict';

const express = require('express');
const handlers = require('../handlers/session');

const router = express();

module.exports = function(path) {
  router.route(path)
    .get(handlers.get)
    .post(handlers.create)
    .delete(handlers.destroy);

  return router;
};
