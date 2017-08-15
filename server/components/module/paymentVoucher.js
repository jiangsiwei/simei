'use strict';

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
  findId() {
    this.setId(this.getPvId());
  }

  findTotal() {
    if (_.isArray(this.getAmount())) {
      this.setTotal(_.sum(this.getAmount()))
    } else {
      this.setTotal(this.getAmount())
    }
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

  getPayee() {
    return this.data.payee;
  }

  setPayee(val) {
    this.data.payee = val;
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

  getDate() {
    return this.data.date
  }

  setDate(val) {
    this.data.date = val;
  }

  getChequeId() {
    return this.data.chequeId
  }

  setChequeId(val) {
    this.data.chequeId = val;
  }

  getAmountWord() {
    return this.data.amountWord
  }

  setAmountWord(val) {
    this.data.amountWord = val;
  }

  getCreatedBy() {
    return this.data.createdBy
  }

  setCreatedBy(val) {
    this.data.createdBy = val;
  }

  getAccount() {
    return this.data.account
  }

  setAccount(val) {
    this.data.account = val;
  }

  getDocumentNo() {
    return this.data.documentNo
  }

  setDocumentNo(val) {
    this.data.documentNo = val;
  }

  getParticulars() {
    return this.data.particulars
  }

  setParticulars(val) {
    this.data.particulars = val;
  }

  getData() {
    return this.data;
  }
}
