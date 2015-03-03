'use strict';

var express = require('express');
var router = express();

var handlers = require('../handlers/session');

exports = module.exports = function(path) {
  router.route(path)
    .get(handlers.get)
    .post(handlers.create)
    .delete(handlers.destroy);

  return router;
};
