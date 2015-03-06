'use strict';

export default (context, payload, done) => {
  done = done || () => {};
  context.Dispatcher.emit('DISMISS_ALL_ALERTS');
  done();
};
