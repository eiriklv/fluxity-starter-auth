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
      <form method='POST' action={this.props.data.apiUrl + '/signup?' + this.props.data.serverRedirect}>
        <div className='row'>
          <div className='six columns'>
            <label>{'Email: '}</label>
            <input
              className='twelve columns'
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.handleFormChange.bind(this, 'email')}
            />
          </div>
          <div className='six columns'>
            <label>{'Password: '}</label>
            <input
              className='twelve columns'
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleFormChange.bind(this, 'password')}
            />
          </div>
        </div>
        <div className='row'>
          <input
            onClick={this.attemptSignup}
            type='submit'
            value='Sign up'
          />
        </div>
      </form>
    );
  }
});

module.exports = SignUpForm;
