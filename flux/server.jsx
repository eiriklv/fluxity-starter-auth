'use strict';

const debug = require('debug')('app:server-render');

const React = require('react');
const Router = require('react-router');
const Flux = require('fluxomorph');
const DocumentTitle = require('react-document-title');

const Html = require('./components/Html.jsx');
const routes = require('./routes.jsx');
const stores = require('./stores');
const actions = require('./actions');
const services = require('./services');

const createCallback = function(cb) {
  let count = 0;

  return function(err, redirect, html) {
    if ((count++) > 0) return debug('trying to call callback twice (res.send) - server.jsx');
    cb(err, redirect, html);
  };
}

const renderApp = function(req, callback) {
  let flux = Flux({
    Stores: stores,
    Actions: actions
  });

  let cb = createCallback(callback);

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

  router.run(function(Handler, routerState) {    
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

module.exports = function(req, res, next) {
  renderApp(req, function(err, redirect, html) {
    if (err && err.notFound) return res.status(404).send(html);
    if (!err && redirect) return res.redirect(303, redirect.to);
    if (err) return next(err);

    res.send(html);
  })
};
