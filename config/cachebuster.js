'use strict';

let cachebuster = {};

cachebuster.remove = function (req, res, next) {
  let hash = req.params[1];
  req._hashedUrl = req.url;
  req.url = req.url.replace(hash, '');
  next();
};

cachebuster.restore = function (req, res, next) {
  req.url = req._hashedUrl;
  delete req._hashedUrl;
  next();
};

cachebuster.path = /\/(js|css|images)\/.*(\.[\w\d]{8})\..*$/;

module.exports = cachebuster;
