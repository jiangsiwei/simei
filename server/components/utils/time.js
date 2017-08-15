'use strict';

const _ = require('lodash');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const moment = require('moment');
const dateFormat = 'DD/MM/YYYY';

module.exports = class Time {
  constructor() {
    this.startTime = this.getNow();
  }

  getNow() {
    return moment(new Date());
  }

  start() {
    this.startTime = this.getNow();
  }

  getStartTime() {
    return this.startTime.toDate();
  }

  getDuration() {
    var endTime = this.getNow();
    return moment.utc(moment.duration(endTime.diff(this.startTime)).asMilliseconds()).format("HH:mm:ss");
  }

  getDurationAsSeconds() {
    var endTime = this.getNow();
    return moment.duration(endTime.diff(this.startTime)).asSeconds();
  }

  format(data) {
    return moment(data).format(dateFormat);
  }
}
