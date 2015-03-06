'use strict';

export default (context, payload, done) => {
  done = done || () => {};

  context.Services.signUp(payload, (err, result) => {
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
