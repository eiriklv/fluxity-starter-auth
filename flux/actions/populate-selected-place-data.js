'use strict';

module.exports = function(context, payload, done=(()=>{})) {
  context.Dispatcher.emit('SET_SELECTED_PLACE_AS_LOADING');

  // check if the place/data requested already exists in
  // the places store and fetch it from there. If not,
  // fetch directly from the database
  let places = context.Stores.Places.getState().data || [];

  let place = places.reduce(function(res, cur) {
    if (cur._id === payload.params.id) res.push(cur);
    return res;
  }, [])[0];

  if (place) {
    context.Dispatcher.emit('POPULATE_SELECTED_PLACE_DATA', place);
    return done();
  }

  context.Services.getPlaceDetails({
    params: payload.params,
    query: payload.query,
    userId: context.User ? context.User.id : null
  }, function(err, place) {
    if (err || !place) {
      context.Dispatcher.emit('SET_SELECTED_PLACE_AS_NOT_FOUND');
      context.Dispatcher.emit('ADD_ALERT', err);
      return done();
    }

    context.Dispatcher.emit('POPULATE_SELECTED_PLACE_DATA', place);
    done();
  });
};
