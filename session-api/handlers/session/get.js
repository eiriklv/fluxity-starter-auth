'use strict';

import passport from 'passport';

export default function(req, res, next) {
  res.status(200).json({
    isLoggedIn: !!req.user,
    user: req.user
  });
};
