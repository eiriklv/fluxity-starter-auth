'use strict';

const React = require('react');

const LoginForm = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptLogin: React.PropTypes.func.isRequired,
    })
  },

  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  attemptLogin(e) {
    e.preventDefault();

    this.props.actions.attemptLogin({
      email: this.state.email,
      password: this.state.password
    });
  },

  handleFormChange(name, e) {
    let newState = {}
    newState[name] = e.target.value;
    this.setState(newState);
  },

  render() {
    return (
      <div className='login-form-box'>
        <form method='POST' action={this.props.data.apiUrl + '/session?' + this.props.data.serverRedirect}>
          <div>
            <label>{'Email: '}</label>
            <p>
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleFormChange.bind(this, 'email')}
              />
            </p>
            <label>{'Password: '}</label>
            <p>
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleFormChange.bind(this, 'password')}
              />
            </p>
            <p>
              <input
                onClick={this.attemptLogin}
                type='submit'
                value='Login'
              />
            </p>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
