'use strict';

const _ = require('lodash');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const moment = require('moment');

module.exports = class Pagination {
  static search(data, req) {
    const {
      query
    } = req;
    const {
      field,
      keyword,
      rangePickerField,
      rangePickerKeyword
    } = query;


    let ret = data;
    if (!_.isNil(field) && !_.isNil(keyword)) {
      ret = _.filter(ret, (t) => {
        return _.includes(_.get(t, field), keyword);
      });
    }

    //for search plus, date
    if (!_.isNil(rangePickerField) && !_.isNil(rangePickerKeyword)) {
      const from = rangePickerKeyword[0]
      const to = rangePickerKeyword[1]
      ret = _.filter(ret, (t) => {
        const val = new moment(_.get(t, rangePickerField)).format('YYYY-MM-DD')
        return val >= from && val <= to;
      });
    }


    return ret
  }

  static slice(data, req) {
    const {
      query
    } = req;
    const {
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
