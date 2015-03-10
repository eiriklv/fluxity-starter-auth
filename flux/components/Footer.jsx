'use strict';

const React = require('react');

const Footer = React.createClass({
  render() {
    return (
      <footer className='HolyGrail-footer'>
        <div className='Footer'>
          <div style={{backgroundColor: 'black', height: 200}}></div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
