'use strict';

import express from 'express';
import sessionRoutes from './routes/session';
import signupRoutes from './routes/signup';
import './passport-init';

const router = express();

router.use(sessionRoutes('/session'));
router.use(signupRoutes('/signup'));

export default router;
