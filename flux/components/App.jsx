'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Flux = require('fluxomorph');

var App = React.createClass({
  mixins: [Flux.StateMixin('Flux')],

  childContextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  getChildContext: function() {
    return {
      Flux: this.props.Flux,
      RouterState: this.props.RouterState
    };
  },

  render: function() {
    return (
      <RouteHandler
        State={this.state}
      />
    );
  }
});

module.exports = App;
