'use strict';

module.exports.remove = function(req, res, next) {
  let hash = req.params[1];
  req._hashedUrl = req.url;
  req.url = req.url.replace(hash, '');
  next();
};

module.exports.restore = function(req, res, next) {
  req.url = req._hashedUrl;
  delete req._hashedUrl;
  next();
};

module.exports.path = /\/(js|css|images)\/.*(\.[\w\d]{8})\..*$/;
