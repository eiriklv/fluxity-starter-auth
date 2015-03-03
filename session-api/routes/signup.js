'use strict';

var express = require('express');
var router = express();

var handlers = require('../handlers/signup');

exports = module.exports = function(path) {
  router.route(path)
    .post(handlers.create)

  return router;
};
