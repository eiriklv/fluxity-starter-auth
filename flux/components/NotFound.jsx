'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

const NotFound = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Not found'}>
        <p>404 Not Found</p>
      </DocumentTitle>
    );
  }
});

export default NotFound;
