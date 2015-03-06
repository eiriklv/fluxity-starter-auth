'use strict';

const debug = require('debug')('app:main');
const config = require('./config/env');
const appSetup = require('./config/app-init-setup');

const app = appSetup.init();

app.use('/api', require('./session-api'));
app.use('/api', require('./server-api'));
app.use('/', require('./flux/server.jsx'));

appSetup.connectToDatabase(config.get('mongo.url'));
appSetup.handleErrors(app);
appSetup.startServer(app, config.get('port'));
