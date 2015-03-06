'use strict';

const passport = require('passport');

module.exports = function(req, res, next) {
  req.logout();

  if (req.query.redirect) {
    return res.redirect(req.query.redirect);
  }

  res.status(200).send({
    message: 'Successfully logged out'
  });
};
