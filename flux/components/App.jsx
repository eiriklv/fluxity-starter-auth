'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';
import { StateMixin } from 'fluxomorph';

const App = React.createClass({
  mixins: [StateMixin('Flux')],

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

export default App;
