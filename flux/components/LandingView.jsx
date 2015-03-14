'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const LandingView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Landing'}>
        <div className='container text-center'>
          <div className='row'>
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
