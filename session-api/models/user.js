'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.statics.login = function(req, email, password, done) {
  this.findOne({
    'email': email
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Wrong password'
      });
    }

    return done(null, user, {
      message: 'Successfully logged in'
    });
  });
}

schema.statics.signup = function(req, email, password, done) {
  let UserModel = this;

  this.findOne({
    'email': email
  }, function(err, user) {
    if (err) return done(err);

    if (user) {
      return done(null, false, {
        message: 'This email is already in use'
      });
    }

    let newUser = new UserModel();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);

    newUser.save(function(err, product) {
      if (err) return done(err);

      done(null, product, {
        message: 'Successfully signed up'
      });
    });
  });
}

module.exports = mongoose.model('user', schema);
