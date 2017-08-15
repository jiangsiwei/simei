'use strict';

const _ = require('lodash');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class Record {
  static findById(database, val) {
    //input val = {id: '123'} OR val = '123'
    if (_.isNil(database) || database.length === 0) {
      return null;
    }

    var record;
    if (_.get(val, 'id', null)) {
      record = _.find(database, {
        id: val.id + ''
      });
    } else {
      record = _.find(database, {
        id: val + ''
      });
    }

    // if(_.isNil(record)){
    //   logger.debug('nil for val', database,val);
    // }

    return record;
  }

  static cleanIdV(record) {
    if (_.isNil(record)) return;
    if (_.get(record, '_id', null)) {
      delete record._id;
    }
    if (_.get(record, '__v', null) != null) {
      delete record.__v;
    }
  }
}
