'use strict';

import express from 'express';
import * as handlers from '../handlers/places';

const router = express();

export default function(path) {
  router.route(path)
    .get(handlers.getAll);

  return router;
};
