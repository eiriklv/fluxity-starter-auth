'use strict';

module.exports = {
  getInitialState: function() {
    return {
      isLoggedIn: false,
      user: {}
    };
  },
  handlers: {
    'SET_USER_AS_LOGGED_IN': function(context, payload) {
      this.replaceState({
        isLoggedIn: !!payload.isLoggedIn,
        user: payload.user
      });
    },
    'SET_USER_AS_LOGGED_OUT': function(context) {
      this.replaceState({
        isLoggedIn: false
      });
    }
  }
};
