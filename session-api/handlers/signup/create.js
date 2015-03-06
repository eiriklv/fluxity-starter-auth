'use strict';

const passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return res.status(200).json({
        user: user,
        info: info
      });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      
      if (req.query.redirect) {
        return res.redirect(req.query.redirect);
      }

      return res.status(200).json({
        user: user,
        info: info
      });
    });
  })(req, res, next);
};
