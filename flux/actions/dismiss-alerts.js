'use strict';

module.exports = function(context, payload, done=(()=>{})) {
  context.Dispatcher.emit('DISMISS_ALL_ALERTS');
  done();
};
