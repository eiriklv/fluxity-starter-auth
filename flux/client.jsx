'use strict';

const React  = require('react');
const Router = require('react-router');
const routes = require('./routes.jsx');

const Flux = require('fluxomorph');
const stores = require('./stores');
const actions = require('./actions');
const api = require('./api');

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
  flux.addToContext('Api', api);

  router.run(function(Handler, routerState) {
    flux.enableUpdates(true);

    React.render(
      <Handler
        Flux={flux.getContext()}
        RouterState={routerState}
      />,
      document.body
    );
  });
});
