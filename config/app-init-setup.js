'use strict';

import url from 'url';
import config from './env';
import Debug from 'debug';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cachebuster from './cachebuster';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passport from 'passport';
import methodOverride from 'method-override';

const debug = Debug('app:config');
const RedisStore = connectRedis(session);
const app = express();

function createSessionStore() {
  let authObject;

  if ('production' == config.get('env')) {
    let parsedUrl = url.parse(config.get('redis.url'));

    authObject = {
      prefix: config.get('redis.session.prefix'),
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      db: config.get('redis.db'),
      pass: parsedUrl.auth ? parsedUrl.auth.split(":")[1] : null,
      secret: config.get('session.secret')
    };

    return new RedisStore(authObject);
  } else {
    return (new session.MemoryStore());
  }
}

export function init() {
  app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(methodOverride('_method'));
  app.use(session({
    secret: config.get('session.secret'),
    store: createSessionStore(),
    name: config.get('session.key'),
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  let publicPath = path.join(__dirname, '/../public');

  app.use(express.static(publicPath));

  if (app.get('env') === 'production') {
    app.get(
      cachebuster.path,
      cachebuster.remove,
      express.static(publicPath),
      cachebuster.restore
    );
  }

  if (app.get('env') === 'development') {
    require('./dev-tools');

    app.use('/js', (req, res) => {
      res.redirect('http://localhost:3001/js' + req.path);
    });
  }

  return app;
}

export function handleErrors(app) {
  app.use((err, req, res, next) => {
    res.status(500);
    console.log('error handler:', err);
    res.send('<pre>' + err.stack + '</pre>');
  });
}

export function startServer(app, port) {
  app.listen(config.get('port'), () => {
    debug('Express ' + config.get('env') + ' server listening on port ' + config.get('port'));
  });
}

export function connectToDatabase(url) {
  function connect() {
    mongoose.connect(url);
  }

  mongoose.connection.on('open', (ref) => {
    debug('open connection to mongo server.');
  });

  mongoose.connection.on('connected', (ref) => {
    debug('connected to mongo server.');
  });

  mongoose.connection.on('disconnected', (ref) => {
    debug('disconnected from mongo server.');
    debug('retrying connection in 2 seconds..');
    setTimeout(connect, 2000);
  });

  mongoose.connection.on('close', (ref) => {
    debug('closed connection to mongo server');
  });

  mongoose.connection.on('error', (err) => {
    debug('error connection to mongo server!');
    debug(err);
  });

  mongoose.connection.on('reconnect', (ref) => {
    debug('reconnect to mongo server.');
  });

  connect();
}
