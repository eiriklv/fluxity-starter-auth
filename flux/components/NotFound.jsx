'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');

const NotFound = React.createClass({
  render: function() {
    return (
      <DocumentTitle title={'Not found'}>
        <p>404 Not Found</p>
      </DocumentTitle>
    );
  }
});

module.exports = NotFound;
