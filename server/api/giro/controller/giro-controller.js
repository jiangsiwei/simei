'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const Pagination = require("../../../components/utils/pagination.js");
const PaymentVoucher = require("../../../components/module/paymentVoucher.js");
const ExportPV = require("../../../components/io/exportPV.js");
const _ = require("lodash");

module.exports = class GiroController {
  static getAll(req, res) {
    Operator
      .getAll(moduleConst.giro, moduleConst.giro)
      .then(data => res.status(200).json(Pagination.handle(data, req)))
      .catch(err => res.status(400).json(err));
  }

  static count(req, res) {
    Operator
      .getAll(moduleConst.giro, moduleConst.giro)
      .then(data => res.status(200).json({
        total: Pagination.getCount(data, req)
      }))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.giro, moduleConst.giro, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;

    Operator
      .createNew(moduleConst.giro, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.giro, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static multiRemove(req, res) {
    let _data = req.body; //include "_id" and "id"

    Operator
      .multiRemove(moduleConst.giro, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;

    Operator
      .update(moduleConst.giro, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;

    Operator
      .upsert(moduleConst.giro, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static monthlySum(req, res) {
    Operator
      .monthlySum(moduleConst.giro, moduleConst.giro)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static yearlySum(req, res) {
    Operator
      .yearlySum(moduleConst.giro, moduleConst.giro)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
