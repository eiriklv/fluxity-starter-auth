'use strict';

const uuid = require('node-uuid');

module.exports = {
  getInitialState: function() {
    return [];
  },
  handlers: {
    'DISMISS_ALL_ALERTS': function(context) {
      this.replaceState([]);
    },
    'ADD_ALERT': function(context, alert) {
      if (!alert) return;

      alert.id = uuid.v4();
      let newState = this.state.concat([alert]);
      this.replaceState(newState);
    }
  }
};
