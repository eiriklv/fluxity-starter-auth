'use strict';

import express from 'express';

import placesSingleRoutes from './routes/places-single';
import placesAllRoutes from './routes/places-all';

const router = express();

router.use(placesSingleRoutes('/places/:id'));
router.use(placesAllRoutes('/places'));

export default router;
