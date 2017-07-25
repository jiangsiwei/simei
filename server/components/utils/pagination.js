"use strict";

const _ = require('lodash');
const log = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class Pagination {
  static search(data, req) {
    let {
      query
    } = req;
    let {
      field,
      keyword
    } = query;


    let newData = data;
    if (!_.isNil(field) && !_.isNil(keyword)) {
      newData = _.filter(data, (t) => {
        return _.includes(_.get(t, field), keyword);
      });
    }

    return newData
  }

  static slice(data, req) {
    let {
      query
    } = req;
    let {
      pageSize,
      page
    } = query

    if (!_.isNil(pageSize) && !_.isNil(page)) {
      return data.slice((page - 1) * pageSize, page * pageSize);
    } else {
      return data;
    }
  }

  static handle(data, req) {
    const newData = this.search(data, req);
    return this.slice(newData, req);
  }

  static getCount(data, req) {
    const newData = this.search(data, req);

    return _.size(newData);
  }
}
