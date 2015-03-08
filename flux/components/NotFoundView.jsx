'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');

const NotFoundView = React.createClass({
  render() {
    return (
      <DocumentTitle title={'Not found'}>
        <p>404 Not Found</p>
      </DocumentTitle>
    );
  }
});

module.exports = NotFoundView;
