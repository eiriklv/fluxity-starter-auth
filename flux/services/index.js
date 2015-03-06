'use strict';

import request from 'superagent';
import { places, user } from './dummy-data';

const apiUrl = process.env.API_URL;

export function getPlaces(payload, cb) {
  request
    .get(apiUrl + '/places')
    .query({
      id: payload.userId
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || []);
    });
};

export function getPlaceDetails(payload, cb) {
  request
    .get(apiUrl + '/places/' + payload.params.id)
    .query({
      id: payload.userId
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

export function getSession(user, cb) {
  if (user) return setImmediate(cb.bind(null, null, user));

  request
    .get(apiUrl + '/session')
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

export function signUp(payload, cb) {
  request
    .post(apiUrl + '/signup')
    .send({
      email: payload.email,
      password: payload.password
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

export function logIn(payload, cb) {
  request
    .post(apiUrl + '/session')
    .send({
      email: payload.email,
      password: payload.password
    })
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};

export function logOut(payload, cb) {
  request
    .del(apiUrl + '/session')
    .end((err, res) => {
      if (err) return cb(err);
      if (res.error) return cb(res.error);
      cb(null, res.body || {});
    });
};
