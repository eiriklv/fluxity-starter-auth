'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

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

  attemptLogin(e) {
    e.preventDefault();

    this.props.actions.attemptLogin({
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    });
  },

  dismissAlerts(e) {
    e.preventDefault();

    this.props.dismissAlerts();
  },

  renderAlerts() {
    return this.props.data.alerts.map(function(alert) {
      return (
        <p key={alert.id}>{alert.message}</p>
      );
    });
  },

  render() {
    return (
      <DocumentTitle title={'Login'}>
        <div className='app'>
          <h1>Login page</h1>

          <div onClick={this.dismissAlerts}>
            {this.renderAlerts()}
          </div>

          <form method='POST' action={this.props.apiUrl + '/session?' + this.props.serverRedirect}>
            <div>
              <label>{'Email: '}</label>
              <p>
                <input
                  type='email'
                  name='email'
                  ref='email'
                  defaultValue={''}
                />
              </p>
              <label>{'Password: '}</label>
              <p>
                <input
                  type='password'
                  name='password'
                  ref='password'
                  defaultValue={''}
                />
              </p>
              <p>
                <input
                  onClick={this.attemptLogin}
                  type='submit'
                  name='commit'
                  value='Login'
                />
              </p>
            </div>
          </form>

          <Link to='landing'>
            {'Go back to landing!'}
          </Link>

          <br />

          <Link to='signup'>
            {'Go to signup!'}
          </Link>

        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LoginView;
