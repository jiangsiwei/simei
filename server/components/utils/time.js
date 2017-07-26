"use strict";

const _ = require('lodash');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const moment = require('moment');

module.exports = class Time {
  constructor() {
    logger.debug('1 constructor');
    this.startTime = this.getNow();
    logger.debug('3 startTime = ', this.startTime);
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
}
