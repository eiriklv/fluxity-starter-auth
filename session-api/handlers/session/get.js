'use strict';

const passport = require('passport');

module.exports = function(req, res, next) {
  res.status(200).json({
    isLoggedIn: !!req.user,
    user: req.user
  });
};
