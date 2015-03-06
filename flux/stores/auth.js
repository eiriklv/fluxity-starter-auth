'use strict';

module.exports = {
  getInitialState() {
    return {
      isLoggedIn: false,
      user: {}
    };
  },
  handlers: {
    SET_USER_AS_LOGGED_IN(context, payload) {
      this.replaceState({
        isLoggedIn: !!payload.isLoggedIn,
        user: payload.user
      });
    },
    SET_USER_AS_LOGGED_OUT(context) {
      this.replaceState({
        isLoggedIn: false
      });
    }
  }
};
