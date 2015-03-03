'use strict';

const React = require('react');
const Router = require('react-router');
const DocumentTitle = require('react-document-title');
const NotFound = require('./NotFound.jsx');
const Loading = require('./Loading.jsx');

const PlaceDetails = React.createClass({
  contextTypes: {
    RouterState: React.PropTypes.object.isRequired,
    Flux: React.PropTypes.shape({
      Actions: React.PropTypes.shape({
        PopulateSelectedPlaceData: React.PropTypes.func.isRequired
      })
    })
  },

  propTypes: {
    State: React.PropTypes.shape({
      PlaceDetails: React.PropTypes.object.isRequired
    })
  },

  statics: {
    willTransitionTo: function(transition, params, query, done) {
      if (!transition.context.shouldUpdate) return done();
      
      transition.context.Actions.PopulateSelectedPlaceData({
        params: params,
        query: query
      }, done);
    }
  },

  render: function() {
    let State = this.props.State;

    if (State.PlaceDetails.isLoading) return <Loading />;
    if (State.PlaceDetails.notFound) return <NotFound />;

    return (
      <DocumentTitle title={State.PlaceDetails.data.name}>
        <div className='place'>
          <h2>{State.PlaceDetails.data.name}</h2>
          <img src={'/images/' + State.PlaceDetails.data.id + '.jpg'}/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = PlaceDetails;
