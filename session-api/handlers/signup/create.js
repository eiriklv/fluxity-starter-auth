'use strict';

import passport from 'passport';

export default function(req, res, next) {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(200).json({
        user: user,
        info: info
      });
    }

    req.logIn(user, (err) => {
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
