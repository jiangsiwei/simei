"use strict";

const _ = require('lodash');
const Record = require('../utils/record.js');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class Payee {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
    }
  }

  //the id is same as the name
  findId(){
    this.setId(this.getName());
  }

  getId() {
    return this.data.id;
  }

  setId(val) {
    this.data.id = val;
  }

  getName() {
    return this.data.name;
  }

  setName(val) {
    this.data.name = val;
  }

  getData() {
    return this.data;
  }
}
