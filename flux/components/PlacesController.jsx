'use strict';

const React = require('react');
const DocumentTitle = require('react-document-title');
const { RouteHandler } = require('react-router');

const NavigationController = require('./NavigationController.jsx');
const Header = require('./Header.jsx');
const Footer = require('./Footer.jsx');

const PlacesController = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.object.isRequired
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
    return (
      <DocumentTitle title={this.props.State.App.title}>
        <div className='HolyGrail'>
          <Header
            title={this.props.State.App.title}
          />
          <main className='HolyGrail-body'>
            <article className='HolyGrail-content'>
              <RouteHandler
                State={this.props.State}
              />
            </article>
            <NavigationController
              State={this.props.State}
            />
            <aside className='HolyGrail-ads'>
              Aside 2
            </aside>
          </main>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = PlacesController;
