'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { RouteHandler } = require('react-router');

const Navigation = require('./Navigation.jsx');

const Places = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.shape({
      App: React.PropTypes.any,
      Alerts: React.PropTypes.any,
      Places: React.PropTypes.any,
      User: React.PropTypes.any
    })
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
    let State = this.props.State;

    return (
      <DocumentTitle title={State.App.title}>
        <div className='app'>
          <Navigation
            State={State}
          />
          <div className='detail'>
            <RouteHandler 
              State={State}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Places;
