'use strict';

module.exports = {
  getInitialState: function() {
    return {
      isLoading: false,
      notFound: false,
      data: []
    };
  },
  handlers: {
    'ADD_PLACE_TO_LIST': function(context, payload) {
      let newState = this.state.data.concat([payload]);
      
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: newState
      });
    },
    'REMOVE_PLACE_FROM_LIST': function(context, id) {
      let place = this.state.data.slice().filter(function(place) {
        return place.id === id;
      })[0];

      if (!place) return;

      let newState = this.state.data.slice();
      newState.splice(newState.indexOf(place), 1);
      
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: newState
      });
    },
    'POPULATE_PLACES_DATA': function(context, payload) {
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: payload
      });
    },
    'POPULATE_PLACES_DATA_FAIL': function(context, payload) {
      this.setState({
        notFound: true
      });
    }
  }
};
