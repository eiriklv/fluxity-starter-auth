'use strict';

const debug = require('debug')('app:server-render');
const React = require('react');
const Router = require('react-router');
const DocumentTitle = require('react-document-title');

const routes = require('./routes.jsx');
const Html = require('./components/Html.jsx');

const Flux = require('fluxomorph');
const stores = require('./stores');
const actions = require('./actions');
const api = require('./api');

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
  flux.addToContext('Api', api);
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

function createCallback(cb) {
  let count = 0;

  return function(err, redirect, html) {
    if ((count++) < 1) {
      cb(err, redirect, html);
    } else {
      debug('trying to call callback twice (res.send) - server.jsx');
    }
  };
}
