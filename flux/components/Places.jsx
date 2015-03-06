'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';
import Navigation from './Navigation.jsx';

const Places = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.shape({
      App: React.PropTypes.any,
      Alerts: React.PropTypes.any,
      Places: React.PropTypes.any,
      User: React.PropTypes.any
    })
  },

  statics: {
    willTransitionTo(transition, params, query, done) {
      if (!transition.context.shouldUpdate) return done();
      
      transition.context.Actions.PopulatePlacesData({
        params: params,
        query: query
      }, done);
    }
  },

  render() {
    let State = this.props.State;

    return (
      <DocumentTitle title={State.App.title}>
        <div className='app'>
          <Navigation
            State={State}
          />
          <div className='detail'>
            <RouteHandler 
              State={State}
            />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default Places;
