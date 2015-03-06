'use strict';

import express from 'express';
import * as handlers from '../handlers/session';

const router = express();

export default function(path) {
  router.route(path)
    .get(handlers.get)
    .post(handlers.create)
    .delete(handlers.destroy);

  return router;
};
