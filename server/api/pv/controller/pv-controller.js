"use strict";

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const PvDAO = require("../dao/pv-dao");
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const Pagination = require("../../../components/utils/pagination.js");
const PaymentVoucher = require("../../../components/module/paymentVoucher.js");
const _ = require("lodash");

const postHandle = (data) => {
  const single = (data) => {
    const val = new PaymentVoucher(data);
    val.findId();
    val.findTotal();
    return val.getData();
  }

  if (_.isArray(data)) {
    let ret = [];
    _.forEach(data, val => ret.push(single(val)));
    return ret;
  } else {
    return single(data)
  }
}

module.exports = class PvController {
  static getAll(req, res) {
    Operator
      .getAll(moduleConst.pv, moduleConst.pv)
      .then(data => res.status(200).json(Pagination.handle(data, req)))
      .catch(err => res.status(400).json(err));
  }

  static count(req, res) {
    Operator
      .getAll(moduleConst.pv, null)
      .then(data => res.status(200).json({
          total: Pagination.getCount(data, req)
      }))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.pv, moduleConst.pv, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;
    postHandle(_data);

    Operator
      .createNew(moduleConst.pv, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.pv, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static multiRemove(req, res) {
    let _data = req.body; //include "_id" and "id"

    Operator
      .multiRemove(moduleConst.pv, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;
    postHandle(_data);

    Operator
      .update(moduleConst.pv, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;
    postHandle(_data);

    Operator
      .upsert(moduleConst.pv, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
