'use strict';

const React = require('react');

const { Route, DefaultRoute, NotFoundRoute } = require('react-router');

const App = require('./components/App.jsx');
const HomeController = require('./components/HomeController.jsx');
const PlacesController = require('./components/PlacesController.jsx');
const LoginController = require('./components/LoginController.jsx');
const SignUpController = require('./components/SignUpController.jsx');
const LandingView = require('./components/LandingView.jsx');
const IndexView = require('./components/IndexView.jsx');
const PlaceDetailsController = require('./components/PlaceDetailsController.jsx');
const NotFoundView = require('./components/NotFoundView.jsx');

const routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='landing' handler={LandingView} />
    <Route name='login' path='/login' handler={LoginController} />
    <Route name='signup' path='/signup' handler={SignUpController} />
    <Route name='home' handler={HomeController}>
      <NotFoundRoute handler={NotFoundView} />
      <Route name='places' path='/places' handler={PlacesController}>
        <DefaultRoute name='index' handler={IndexView} />
        <Route name='place-details' path='/places/:id' handler={PlaceDetailsController} />
        <NotFoundRoute name='notfound' handler={NotFoundView} />
      </Route>
    </Route>
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

module.exports = routes;
