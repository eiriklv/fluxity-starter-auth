'use strict';

const React = require('react');
const Flux = require('fluxomorph');
const { RouteHandler } = require('react-router');

const App = React.createClass({
  mixins: [Flux.StateMixin('Flux')],

  childContextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      Flux: this.props.Flux,
      RouterState: this.props.RouterState
    };
  },

  render() {
    return (
      <RouteHandler
        State={this.state}
      />
    );
  }
});

module.exports = App;
