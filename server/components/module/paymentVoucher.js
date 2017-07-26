"use strict";

const _ = require('lodash');
const Record = require('../utils/record.js');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class PaymentVoucher {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
    }
  }

  //the id is same as the name
  findId(){
    this.setId(this.getPvId());
  }

  findTotal(){
    this.setTotal(_.sum(this.getAmount()))
  }

  getId() {
    return this.data.id;
  }

  setId(val) {
    this.data.id = val;
  }

  getPvId() {
    return this.data.pvId;
  }

  setPvId(val) {
    this.data.pvId = val;
  }

  getAmount() {
    return this.data.amount;
  }

  setAmount(val) {
    this.data.amount = val;
  }

  getTotal() {
    return this.data.total;
  }

  setTotal(val) {
    this.data.total = val;
  }

  getData() {
    return this.data;
  }
}
