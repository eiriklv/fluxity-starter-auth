'use strict';

import passport from 'passport';

export default function(req, res, next) {
  req.logout();

  if (req.query.redirect) {
    return res.redirect(req.query.redirect);
  }

  res.status(200).send({
    message: 'Successfully logged out'
  });
};
