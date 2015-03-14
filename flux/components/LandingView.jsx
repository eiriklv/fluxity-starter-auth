'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { Link } = require('react-router');

const LandingView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Landing'}>

        <div className='section'>
          <div className='container'>
            <h3 className='section-heading'>{'Landing page'}</h3>
            <p className='section-description'>{'Wanna see the real stuff?'}</p>
            <Link
              className='button button-primary'
              to='places'
            >
              {'Enter the service!'}
            </Link>
          </div>
        </div>

      </DocumentTitle>
    );
  }
});

module.exports = LandingView;
