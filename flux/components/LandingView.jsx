'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const LandingView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Landing'}>
        <div className='app'>
          <h1>Landing Page</h1>
          <Link to='places'>
            {'Go look at the places!'}
          </Link>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LandingView;
