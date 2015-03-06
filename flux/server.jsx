'use strict';

import Debug from 'debug';
import React from 'react';
import Router from 'react-router';
import DocumentTitle from 'react-document-title';
import Flux from 'fluxomorph';
import Html from './components/Html.jsx';
import routes from './routes.jsx';
import * as stores from './stores';
import * as actions from './actions';
import * as services from './services';

const debug = Debug('app:server-render');

const wrapCallback = function(cb) {
  let count = 0;

  return (err, redirect, html) => {
    if ((count++) > 0) 
      return debug('trying to call callback twice (res.send) - server.jsx');
    cb(err, redirect, html);
  };
};

const renderApp = function(req, callback) {
  let flux = Flux({
    Stores: stores,
    Actions: actions
  });

  let cb = wrapCallback(callback);

  let router = Router.create({
    routes: routes,
    location: req.url,
    transitionContext: flux.getContext(),
    onAbort: cb.bind(null, null),
    onError: cb.bind(null)
  });

  flux.addToContext('Router', router);
  flux.addToContext('Services', services);
  flux.addToContext('User', {
    user: req.user,
    id: req.user ? req.user._id.toString() : null,
    isLoggedIn: !!req.user
  });

  router.run((Handler, routerState) => {    
    let title = DocumentTitle.rewind();
    
    let markup = React.renderToString(
      <Handler
        Flux={flux.getContext()}
        RouterState={routerState}
      />
    );

    let html = React.renderToStaticMarkup(
      <Html
        title={title}
        markup={markup}
        __initialContext={flux.dehydrate()}
      />
    );

    cb(null, null, '<!DOCTYPE html>' + html)
  });
};

export default function(req, res, next) {
  renderApp(req, (err, redirect, html) => {
    if (err && err.notFound) return res.status(404).send(html);
    if (!err && redirect) return res.redirect(303, redirect.to);
    if (err) return next(err);

    res.send(html);
  })
};
