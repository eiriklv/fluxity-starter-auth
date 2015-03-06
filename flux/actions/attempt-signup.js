'use strict';

module.exports = function(context, payload, done=(()=>{})) {
  context.Services.signUp(payload, function(err, result) {
    if (err) {
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    if (result.user) {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_IN', result);
      context.Dispatcher.emit('DISMISS_ALL_ALERTS');
      context.Router.transitionTo('/places');
    } else {
      context.Dispatcher.emit('SET_USER_AS_LOGGED_OUT');
      context.Dispatcher.emit('ADD_ALERT', result.info);
    }

    done();
  });
};
