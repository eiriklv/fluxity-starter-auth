'use strict';

import config from './config/env';
import * as appSetup from './config/app-init-setup';
import sessionApi from './session-api';
import serverApi from './server-api';
import renderApp from './flux/server.jsx';

const app = appSetup.init();

app.use('/api', sessionApi);
app.use('/api', serverApi);
app.use('/', renderApp);

appSetup.connectToDatabase(config.get('mongo.url'));
appSetup.handleErrors(app);
appSetup.startServer(app, config.get('port'));
