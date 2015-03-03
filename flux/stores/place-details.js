'use strict';

module.exports = {
  getInitialState: function() {
    return {
      isLoading: false,
      notFound: false,
      data: {}
    };
  },
  handlers: {
    'POPULATE_SELECTED_PLACE_DATA': function(context, payload) {
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: payload
      });
    },
    'SET_SELECTED_PLACE_AS_LOADING': function(context) {
      this.replaceState({
        isLoading: true
      });
    },
    'SET_SELECTED_PLACE_AS_NOT_FOUND': function(context) {
      this.replaceState({
        notFound: true
      });
    }
  }
};
