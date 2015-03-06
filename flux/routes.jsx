'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Places from './components/Places.jsx';
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Index from './components/Index.jsx';
import PlaceDetails from './components/PlaceDetails.jsx';
import NotFound from './components/NotFound.jsx';

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

export default routes;
