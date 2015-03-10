'use strict';

const React = require('react');
const qs = require('qs');
const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/login';
const NavigationView = require('./NavigationView.jsx');

const NavigationController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  getServerRedirect() {
    return qs.stringify({
      redirect: successRedirect
    });
  },

  render() {
    return (
      <NavigationView
        data={{
          apiUrl: apiUrl,
          places: this.props.State.Places.data,
          serverRedirect: qs.stringify({
            redirect: successRedirect
          })
        }}
        actions={{
          attemptLogout: this.context.Flux.Actions.AttemptLogout
        }}
      />
    );
  }
});

module.exports = NavigationController;
