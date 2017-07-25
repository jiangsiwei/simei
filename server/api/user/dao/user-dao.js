"use strict";

const mongoose = require("mongoose");
const log = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');
const Promise = require("bluebird");
const userSchema = require("../model/user-model.js");
const jwt = require('jsonwebtoken');
const config = require('../../../constants/env.json');
const FindPopulate = require('../../../components/operator/findPopulate.js');
const moduleConstant = require('../../../constants/module.js');

userSchema.statics.getAll = (data) => {
  return new Promise((resolve, reject) => {
    let _query = {};

    User.find(_query, '-salt -hashedPassword').populate(FindPopulate.find(moduleConstant.user)).exec((err, data) => {
      err
        ?
        reject(err) :
        resolve(data);
    });
  });
}

userSchema.statics.create = (data) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(data)) {
      return reject(new TypeError("data is not a valid object."));
    }

    let _user = new User(data);

    _user.save((err, saved) => {
      if (err) {
        reject(err);
      } else {
        var token = jwt.sign({
          _id: _user._id
        }, config.secrets.session, {
          expiresIn: config.expireInSeconds
        });

        resolve({
          token: token
        });
      }
    });
  });
}

userSchema.statics.getById = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new TypeError("Id is not defined."));
    }

    User.findById(id).populate(FindPopulate.find(moduleConstant.user)).exec((err, found) => {
      if (err) {
        reject(err);
      } else if (!found) {
        reject('Unahthorized');
      } else {
        resolve(found.profile)
      }
    });
  });
}

userSchema.statics.me = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new TypeError("Id is not defined."));
    }

    User.findOne({
      _id: id
    }, '-salt -hashedPassword').populate(FindPopulate.find(moduleConstant.user)).exec((err, found) => {
      if (err) {
        reject(err);
      } else if (!found) {
        reject('Unahthorized');
      } else {
        resolve(found)
      }
    });
  });
}

userSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError("Id is not a valid string."));
    }

    User.findByIdAndRemove(id).exec((err, deleted) => {
      log.debug('0', err, deleted);
      err
        ?
        reject(err) :
        resolve(deleted);
    });
  });
}

userSchema.statics.changePassword = (userId, oldPass, newPass) => {
  return new Promise((resolve, reject) => {

    User.findById(userId, (err, user) => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        user.save(function(err) {
          err ? reject(err) : resolve('password changed successfully');
        });
      } else {
        reject('Forbidden-dog');
      }
    });
  });
}

const User = mongoose.model("User", userSchema);

module.exports = User;
