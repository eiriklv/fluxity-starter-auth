'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { RouteHandler } = require('react-router');
const NavigationController = require('./NavigationController.jsx');

const PlacesController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, done) {
      if (!transition.context.shouldUpdate) return done();
      
      transition.context.Actions.PopulatePlacesData({
        params: params,
        query: query
      }, done);
    }
  },

  render() {
    return (
      <DocumentTitle title={this.props.State.App.title}>
        <div className='app'>
          <NavigationController
            State={this.props.State}
          />
          <div className='detail'>
            <RouteHandler
              State={this.props.State}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = PlacesController;
