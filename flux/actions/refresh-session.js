'use strict';

module.exports = function(context, done) {
  done = done || function() {};

  context.Api.getSession(context.User, function(err, result) {
    if (err) {
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    if (!result.user) {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_OUT');
    } else {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_IN', result);
    }

    done();
  });
};
