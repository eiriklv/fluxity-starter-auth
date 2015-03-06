'use strict';

export default (context, payload, done) => {
  done = done || () => {};

  context.Services.logOut(payload, (err, result) => {
    if (err) return done(err);

    context.Dispatcher.emit('SET_USER_AS_LOGGED_OUT');
    context.Router.transitionTo('/');

    done();
  });
};
