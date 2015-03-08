'use strict';

const React = require('react');
const qs = require('qs');
const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/places';

const LoginView = require('./LoginView.jsx');

const LoginController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <LoginView
        data={{
          apiUrl: apiUrl,
          alerts: this.props.State.Alerts,
          serverRedirect: qs.stringify({
            redirect: successRedirect
          })
        }}
        actions={{
          attemptLogin: this.context.Flux.Actions.AttemptLogin,
          dismissAlerts: this.context.Flux.Actions.DismissAlerts
        }}
      />
    );
  }
});

module.exports = LoginController;
