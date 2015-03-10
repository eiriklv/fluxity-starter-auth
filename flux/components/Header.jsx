'use strict';

const React = require('react');

const Header = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <header className='HolyGrail-header'>
        <div className='Header' role='banner'>
          <h1>{this.props.title}</h1>
        </div>
      </header>
    );
  }
});

module.exports = Header;
