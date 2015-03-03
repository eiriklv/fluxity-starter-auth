function _throw(m) {
  throw m;
}

var util = require('util');
var convict = require('convict');
var debug = require('debug')('app:config');

process.on('uncaughtException', function(err) {
  debug('Caught exception without specific handler: ', err);
  debug(err.stack, 'error');
  process.exit(1);
});

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  session: {
    key: {
      doc: 'Session key.',
      default: 'connect.sid',
      env: 'SESSION_KEY'
    },
    secret: {
      doc: 'The application secret (sessions).',
      default: 'somesillysecret',
      env: 'SESSION_SECRET'
    }
  },
  port: {
    doc: 'The server port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  api: {
    path: {
      doc: 'The client api url path (relative)',
      default: '/api',
      env: 'API_PATH'
    },
    url: {
      doc: 'The client api url path (absolute)',
      default: 'http://localhost:3000/api',
      env: 'API_URL'
    }
  },
  domain: {
    doc: 'The client domain (hostname)',
    default: 'localhost',
    env: 'DOMAIN'
  },
  mongo: {
    url: {
      doc: 'MongoDB url to connect to (including db reference)',
      default: 'mongodb://localhost/isomorphic-boilerplate',
      env: 'MONGO_URL'
    }
  },
  redis: {
    url: {
      doc: 'Redis url to connect to (including auth string)',
      default: 'redis://localhost:6379',
      env: 'REDIS_URL'
    },
    session: {
      prefix: {
        doc: 'Redis session prefix (to separate session for different processes)',
        default: 'sess:',
        env: 'REDIS_SESSION_PREFIX'
      }
    },
    db: {
      doc: 'Redis database number (0-15)',
      default: 0,
      env: 'REDIS_DB'
    }
  }
});

debug(util.inspect(process.env, {
  colors: true
}));

config.validate();

module.exports = config;
