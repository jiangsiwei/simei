"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const log = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    User.findOne({
      email: email.toLowerCase()
    }).exec((err, user) => {
      if (err)
        return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }));
};
