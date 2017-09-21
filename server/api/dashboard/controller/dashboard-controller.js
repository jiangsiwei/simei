'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const _ = require("lodash");
const async = require('async');

const initial = (dashboard) => {
  //{month: 8, pv: 19, giro: 90, receipt: 100}
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  _.forEach(number, (i) => {
    dashboard.push({
      month: months[i - 1],
      number: i
    })
  })
}

const mergeMonth = (dashboard, name, data) => {
  _.forEach(data, (val) => {
    const idx = _.findIndex(dashboard, (d) => {
      return d.number == val._id
    })
    if (idx >= 0) {
      _.set(dashboard[idx], name, val.total)
    }
  })
  // logger.debug(dashboard)
}

const pvMonthlySum = (dashboard, callback) => {
  Operator
    .monthlySum(moduleConst.pv, moduleConst.pv)
    .then((data) => {
      mergeMonth(dashboard, moduleConst.pv, data.total)
      callback(null, dashboard);
    })
    .catch((err) => {
      callback(err, dashboard)
    });
}

const giroMonthlySum = (dashboard, callback) => {
  Operator
    .monthlySum(moduleConst.giro, moduleConst.giro)
    .then((data) => {
      mergeMonth(dashboard, moduleConst.giro, data.total)
      callback(null, dashboard);
    })
    .catch((err) => {
      callback(err, dashboard)
    });
}

const receiptMonthlySum = (dashboard, callback) => {
  Operator
    .monthlySum(moduleConst.receipt, moduleConst.receipt)
    .then((data) => {
      mergeMonth(dashboard, moduleConst.receipt, data.total)
      callback(null, dashboard);
    })
    .catch((err) => {
      callback(err, dashboard)
    });
}

module.exports = class DashboardController {
  static getAll(req, res) {

    //Runs an array of functions in series
    var dashboard = [];
    var entry = (callback) => {
      initial(dashboard)
      callback(null, dashboard);
    };

    async.waterfall([
      entry,
      pvMonthlySum,
      giroMonthlySum,
      receiptMonthlySum
    ], function(err, data) {
      // logger.debug('err', err);
      // logger.debug('data', data);
      err ? res.status(400).json(err) : res.status(200).json(data)
    });

  }

}
