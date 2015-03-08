'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const SignUpView = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      alerts: React.PropTypes.array.isRequired,
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptSignup: React.PropTypes.func.isRequired
    })
  },

  attemptSignup(e) {
    e.preventDefault();

    this.props.actions.attemptSignup({
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    });
  },

  dismissAlerts(e) {
    e.preventDefault();

    this.actions.dismissAlerts();
  },

  renderAlerts(alerts) {
    return alerts.map(function(alert) {
      return <p key={alert.id}>{alert.message}</p>
    });
  },

  render() {
    return (
      <DocumentTitle title={'Signup'}>
        <div className='app'>
          <h1>Signup page</h1>

          <div onClick={this.dismissAlerts}>
            {this.renderAlerts(this.props.data.alerts)}
          </div>

          <form method='POST' action={this.props.data.apiUrl + '/signup?' + this.props.data.serverRedirect}>
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
                  onClick={this.attemptSignup}
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

          <Link to='login'>
            {'Go to login!'}
          </Link>

        </div>
      </DocumentTitle>
    );
  }
});

module.exports = SignUpView;
