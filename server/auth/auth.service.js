"use strict";

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const config = require('../constants/env.json');
const User = require('../api/user/dao/user-dao.js');
const validateJwt = expressJwt({
  secret: config.secrets.session
});
const qs = require('qs');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      //reaad cookie
      const tmp = req.headers.cookie || ''
      const cookie = qs.parse(tmp.replace(/\s/g, ''), {
        delimiter: ';'
      })
      if (cookie && cookie.hasOwnProperty('token')) {
        req.headers.authorization = 'Bearer ' + String(cookie.token);
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).populate({
        path: 'role'
      }).exec((err, user) => {
        if (err)
          return next(err);
        if (!user)
          return res.status(401).send('Unauthorized');

        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired)
    throw new Error('Required role needs to be set');

  return compose().use(isAuthenticated()).use(function meetsRequirements(req, res, next) {
    if (config.userRoles.indexOf(req.user.role.id) >= config.userRoles.indexOf(roleRequired)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({
    _id: id
  }, config.secrets.session, {
    expiresIn: config.expireInSeconds
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user)
    return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
