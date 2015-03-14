'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const AlertBox = require('./AlertBox.jsx');
const LoginForm = require('./LoginForm.jsx');

const LoginView = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      alerts: React.PropTypes.array.isRequired,
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptLogin: React.PropTypes.func.isRequired,
      dismissAlerts: React.PropTypes.func.isRequired
    })
  },

  render() {
    return (
      <DocumentTitle title={'Login'}>
        <div className='container'>
          <div className='row'>
            <h1>Login page</h1>

            <LoginForm
              data={{
                apiUrl: this.props.data.apiUrl,
                serverRedirect: this.props.data.serverRedirect
              }}
              actions={{
                attemptLogin: this.props.actions.attemptLogin
              }}
            />

            <p><Link to='landing'>{'Go back to landing!'}</Link></p>
            <p><Link to='signup'>{'Go to signup!'}</Link></p>
          </div>

          <div className='row'>
            <AlertBox
              data={{
                alerts: this.props.data.alerts
              }}
              actions={{
                dismissAlerts:this.props.actions.dismissAlerts
              }}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LoginView;
