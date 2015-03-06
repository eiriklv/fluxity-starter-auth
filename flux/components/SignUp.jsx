'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import qs from 'qs';

const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/places';

const SignUp = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  attemptSignup(e) {
    e.preventDefault();

    this.context.Flux.Actions.AttemptSignup({
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
    });
  },

  dismissAlerts(e) {
    e.preventDefault();

    this.context.Flux.Actions.DismissAlerts();
  },

  renderAlerts() {
    return this.props.State.Alerts.map((alert) => {
      return (
        <p key={alert.id}>
          {alert.message}
        </p>
      );
    });
  },

  getServerRedirect() {
    return qs.stringify({
      redirect: successRedirect
    });
  },

  render() {
    return (
      <DocumentTitle title={'Signup'}>
        <div className='app'>
          <h1>Signup page</h1>

          <div onClick={this.dismissAlerts}>
            {this.renderAlerts()}
          </div>

          <form method='POST' action={apiUrl + '/signup?' + this.getServerRedirect()}>
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

export default SignUp;
