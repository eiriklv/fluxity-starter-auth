'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const Router = require('react-router');
const Link = Router.Link;

const qs = require('qs');
const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/places';

const Login = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  attemptLogin: function(e) {
    e.preventDefault();

    this.context.Flux.Actions.AttemptLogin({
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    });
  },

  dismissAlerts: function(e) {
    e.preventDefault();

    this.context.Flux.Actions.DismissAlerts();
  },

  renderAlerts: function() {
    return this.props.State.Alerts.map(function(alert) {
      return <p key={alert.id}>{alert.message}</p>
    });
  },

  getServerRedirect: function() {
    return qs.stringify({
      redirect: successRedirect
    });
  },

  render: function() {
    return (
      <DocumentTitle title={'Login'}>
        <div className='app'>
          <h1>Login page</h1>

          <div onClick={this.dismissAlerts}>
            {this.renderAlerts()}
          </div>

          <form method='POST' action={apiUrl + '/session?' + this.getServerRedirect()}>
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

module.exports = Login;
