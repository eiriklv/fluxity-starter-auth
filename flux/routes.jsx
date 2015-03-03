'use strict';

const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;
const NotFoundRoute = Router.NotFoundRoute;

const App = require('./components/App.jsx');
const Home = require('./components/Home.jsx');
const Places = require('./components/Places.jsx');
const Landing = require('./components/Landing.jsx');
const Login = require('./components/Login.jsx');
const SignUp = require('./components/SignUp.jsx');
const Index = require('./components/Index.jsx');
const PlaceDetails = require('./components/PlaceDetails.jsx');
const NotFound = require('./components/NotFound.jsx');

const routes = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='landing' handler={Landing} />
    <Route name='login' path='/login' handler={Login} />
    <Route name='signup' path='/signup' handler={SignUp} />
    <Route name='home' handler={Home}>
      <NotFoundRoute handler={NotFound} />
      <Route name='places' path='/places' handler={Places}>
        <DefaultRoute name='index' handler={Index} />
        <Route name='place-details' path='/places/:id' handler={PlaceDetails} />
        <NotFoundRoute name='notfound' handler={NotFound} />
      </Route>
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;
