'use strict';

module.exports = function(context, payload, done) {
  done = done || function() {};
  context.Dispatcher.emit('DISMISS_ALL_ALERTS');
  done();
};
