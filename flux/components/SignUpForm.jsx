'use strict';

const React = require('react');

const SignUpForm = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptSignup: React.PropTypes.func.isRequired
    })
  },

  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  attemptSignup(e) {
    e.preventDefault();

    this.props.actions.attemptSignup({
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
      <div className='signup-form-box'>
        <form method='POST' action={this.props.data.apiUrl + '/signup?' + this.props.data.serverRedirect}>
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
                onClick={this.attemptSignup}
                type='submit'
                value='Sign Up'
              />
            </p>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = SignUpForm;
