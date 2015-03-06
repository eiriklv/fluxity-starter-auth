'use strict';

import express from 'express';
import * as handlers from '../handlers/signup';

const router = express();

export default function(path) {
  router.route(path)
    .post(handlers.create)

  return router;
};
