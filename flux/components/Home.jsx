'use strict';

const React = require('react');
const Flux = require('fluxomorph');
const { RouteHandler } = require('react-router');

const Home = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.shape({
      Actions: React.PropTypes.shape({
        RefreshSession: React.PropTypes.func.isRequired
      }),
      Stores: React.PropTypes.shape({
        Auth: React.PropTypes.object.isRequired
      })
    }),
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  statics: {
    willTransitionTo(transition, params, query, done) {
      transition.context.Actions.RefreshSession(function(err) {
        if (!transition.context.Stores.Auth.getState().isLoggedIn) {
          transition.redirect('/login');
        }
        done();
      });
    }
  },

  render() {
    return (
      <RouteHandler
        State={this.props.State}
      />
    );
  }
});

module.exports = Home;
