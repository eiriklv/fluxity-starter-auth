'use strict';

module.exports = function(context, payload, done) {
  done = done || function() {};

  context.Api.logOut(payload, function(err, result) {
    if (err) return done(err);

    context.Dispatcher.emit('SET_USER_AS_LOGGED_OUT');
    context.Router.transitionTo('/');

    done();
  });
};
