'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require("lodash");
const async = require('async');
const Promise = require("bluebird");
//the constant of module
const FindModule = require('./findModule.js');
const FindPopulate = require('./findPopulate.js');
//others
const Record = require('../utils/record.js');

module.exports = class Opeator {
  static getAll(daoName, populateName, fieldList = null) {
    return new Promise((resolve, reject) => {
      let _query = {};

      FindModule.find(daoName).find(_query, fieldList)
        .populate(FindPopulate.find(populateName))
        .exec((err, data) => {
          err ? reject(err) : resolve(data);
        });
    });
  }

  static getById(daoName, populateName, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new TypeError("Id is not defined."));
      }

      FindModule.find(daoName).findById(id)
        .populate(FindPopulate.find(populateName))
        .exec((err, found) => {
          err ? reject(err) : resolve(found);
        });
    });
  }

  static createNew(daoName, data) {
    return new Promise((resolve, reject) => {
      if (!_.isObject(data)) {
        return reject(new TypeError("Problem is not a valid object."));
      }

      //clean _id and __v
      Record.cleanIdV(data);
      let dao = FindModule.find(daoName);
      let _created = new dao(data);

      _created.save((err, saved) => {
        err ? reject(err) : resolve(saved);
      });
    });
  }

  static deleteById(daoName, id) {
    return new Promise((resolve, reject) => {
      if (!_.isString(id)) {
        return reject(new TypeError("Id is not a valid string."));
      }

      FindModule.find(daoName).findByIdAndRemove(id).exec((err, deleted) => {
        err ? reject(err) : resolve(deleted);
      });
    });
  }

  static update(daoName, id, data) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new TypeError("Id is not defined."));
      }

      FindModule.find(daoName).findById(id).exec((err, found) => {
        if (err) {
          reject(err);
        } else {
          if (data._id) {
            delete data._id;
          }

          // logger.debug('0', found);
          // var _updated = _.merge(found, data);
          var _updated = _.assign(found, data);
          // logger.debug('1', found);
          _updated.save(function(err, saved) {
            err ? reject(err) : resolve(saved);
          });
        }
      });
    });
  }

  static upsert(daoName, data) {
    return new Promise((resolve, reject) => {
      if (!_.isArray(data)) {
        data = [data];
      }
      var output = [];

      async.eachLimit(data, 100, function(record, next) {
        //clean _id and __v
        Record.cleanIdV(record);
        if (_.get(record, 'id', null)) {
          FindModule.find(daoName).findOneAndUpdate({
            id: record.id
          }, record, {
            upsert: true,
            new: true
          }).exec((err, upserted) => {
            if (err) {
              next(err, null);
            } else {
              output.push(upserted);
              next(null, upserted);
            }
          });
        } else {
          next(null, record); //just go to the next record
        }
      }, function(err) {
        err ? reject(err) : resolve(output);
      });
    });
  }

  //find multiple documents
  static find(daoName, populateName, data) {
    return new Promise((resolve, reject) => {
      if (!_.isArray(data)) {
        data = [data];
      }

      FindModule.find(daoName).find({
          "_id": {
            "$in": data
          }
        })
        .populate(FindPopulate.find(populateName))
        .exec((err, found) => {
          err ? reject(err) : resolve(found);
        });
    });
  }

  //remove multiple documents
  static multiRemove(daoName, data) {
    return new Promise((resolve, reject) => {
      if (!_.isArray(data)) {
        data = [data];
      }

      FindModule.find(daoName).remove({
          "_id": {
            "$in": data
          }
        })
        .exec((err, deleted) => {
          err ? reject(err) : resolve(deleted);
        });
    });
  }

  static count(daoName) {
    return new Promise((resolve, reject) => {
      let _query = {};

      FindModule.find(daoName).count()
        .exec((err, data) => {
          err ? reject(err) : resolve({
            total: data
          });
        });
    });
  }

  static monthlySum(daoName) {
    return new Promise((resolve, reject) => {
      let _query = {};

      FindModule.find(daoName).aggregate([{
          "$project": {
            "total": 1,
            "month": {
              "$month": "$date"
            }
          }
        },
        {
          "$group": {
            "_id": "$month",
            "total": {
              "$sum": "$total"
            }
          }
        }
      ]).exec((err, data) => {
        err ? reject(err) : resolve({
          total: data
        });
      });
    });
  }

  static yearlySum(daoName) {
    return new Promise((resolve, reject) => {
      let _query = {};

      FindModule.find(daoName).aggregate([{
          "$project": {
            "total": 1,
            "year": {
              "$year": "$date"
            }
          }
        },
        {
          "$group": {
            "_id": "$year",
            "total": {
              "$sum": "$total"
            }
          }
        }
      ]).exec((err, data) => {
        err ? reject(err) : resolve({
          total: data
        });
      });
    });
  }
}
