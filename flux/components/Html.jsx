'use strict';

const React = require('react');

const Html = React.createClass({
  propTypes: {
    markup: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    __initialContext: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel='icon' type='image/png' href='/images/favicon.png' />
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css' />
          <link rel='stylesheet' href='/css/main.css' />
          <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css' />
          <script src='/js/lib.js'></script>
          <script src='/js/main.js'></script>
          <script dangerouslySetInnerHTML={{__html: '__initialContext = ' + JSON.stringify(this.props.__initialContext)}} />
        </head>
        
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}} />
        </body>
      </html>
    );
  }
});

module.exports = Html;
