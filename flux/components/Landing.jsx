'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

const Landing = React.createClass({
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

export default Landing;
