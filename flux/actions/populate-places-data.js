'use strict';

module.exports = function(context, payload, done) {
  done = done || function() {};

  context.Dispatcher.emit('SET_PLACES_AS_LOADING');

  context.Api.getPlaces({
    params: payload.params,
    query: payload.query,
    userId: context.User ? context.User.id : null
  }, function(err, places) {
    if (err || !places) {
      context.Dispatcher.emit('POPULATE_PLACES_DATA', []);
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }
    
    context.Dispatcher.emit('POPULATE_PLACES_DATA', places);
    done();
  });
};
