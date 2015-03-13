'use strict';

require('react-tap-event-plugin')();

const React  = require('react');
const Router = require('react-router');
const Flux = require('fluxomorph');

const routes = require('./routes.jsx');
const stores = require('./stores');
const actions = require('./actions');
const services = require('./services');

document.addEventListener('DOMContentLoaded', function(event) {
  let initialContext = window.__initialContext || {};

  let flux = Flux({
    Stores: stores,
    Actions: actions
  });

  flux.rehydrate(initialContext);
  flux.enableUpdates(false);
  
  let router = Router.create({
    routes: routes,
    location: Router.HistoryLocation,
    transitionContext: flux.getContext()
  });

  flux.addToContext('Router', router);
  flux.addToContext('Services', services);

  router.run(function(Handler, routerState) {
    flux.enableUpdates(true);

    React.render(
      <Handler
        Flux={flux.getContext()}
        RouterState={routerState}
      />,
      document.querySelector('#app')
    );
  });
});
