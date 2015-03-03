'use strict';

const Place = require('../../models/place');

exports = module.exports = function(req, res) {
  let userId = req.user ?
    req.user._id :
    req.query.id;

  Place.findAllByOwner({
    userId: userId
  }, function(err, result) {
    if (err) {
      return res.status(400).send({
        err: err
      });
    }

    res.status(200).send(result);
  });
};
