'use strict';

var express = require('express');
var router = express();

var handlers = require('../handlers/places');

exports = module.exports = function(path) {
  router.route(path)
    .get(handlers.getAll);

  return router;
};
