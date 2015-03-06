'use strict';

import React from 'react';
import Router from 'react-router';
import Flux from 'fluxomorph';
import routes from './routes.jsx';
import * as stores from './stores';
import * as actions from './actions';
import * as services from './services';

document.addEventListener('DOMContentLoaded', (event) => {
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

  router.run((Handler, routerState) => {
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
