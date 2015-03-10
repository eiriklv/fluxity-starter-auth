'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const LandingView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Landing'}>
        <div className='center-container'>
          <div className='center-item'>
            <h1>Landing Page</h1>
            <Link to='places'>
              {'Go look at the places!'}
            </Link>
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LandingView;
