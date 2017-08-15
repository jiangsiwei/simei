'use strict';

const _ = require('lodash');
const Record = require('../utils/record.js');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class Todo {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
    }
  }



  getMessage() {
    return this.data.todoMessage;
  }

  setMessage(val) {
    this.data.todoMessage = val;
  }

  getData() {
    return this.data;
  }
}
