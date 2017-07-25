"use strict";

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error)
      return res.status(401).json(error);
    if (!user)
      return res.status(404).json({
        message: 'Something went wrong, please try again.'
      });

    var token = auth.signToken(user._id, user.role);

    //set the cookie
    res.cookie('token', token, {
      maxAge: 900000, // 900000 = 15 * 60 * 1000
      httpOnly: true,
    })

    res.json({
      token: token
    });
  })(req, res, next)
});

router.delete('/logout', function(req, res, next) {
  res.clearCookie('token');
  res.status(200).end();
});

module.exports = router;
