'use strict';

export default (context, payload, done) => {
  done = done || () => {};

  context.Dispatcher.emit('SET_SELECTED_PLACE_AS_LOADING');

  context.Services.getPlaceDetails({
    params: payload.params,
    query: payload.query,
    userId: context.User ? context.User.id : null
  }, (err, place) => {
    if (err || !place) {
      context.Dispatcher.emit('SET_SELECTED_PLACE_AS_NOT_FOUND');
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    context.Dispatcher.emit('POPULATE_SELECTED_PLACE_DATA', place);
    done();
  });
};
