'use strict';

import Place from '../../models/place';

export default function(req, res) {
  let userId = req.user ?
    req.user._id :
    req.query.id;

  Place.findOneByIdAndOwner({
    placeId: req.params.id,
    userId: userId
  }, (err, result) => {
    if (err) {
      return res.status(400).send({
        err: err
      });
    }

    res.status(200).send(result);
  });
};
