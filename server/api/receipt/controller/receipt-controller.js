'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const ReceiptDAO = require("../dao/receipt-dao");
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const Pagination = require("../../../components/utils/pagination.js");
const _ = require("lodash");

module.exports = class ReceiptController {
  static getAll(req, res) {
    //find the parameters
    const {
      query
    } = req
    const paras = {
      page: query.page,
      pageSize: query.pageSize,
      sortField: query.sortField,
      sortOrder: query.sortOrder,
    }

    Operator
      .getAll(moduleConst.receipt, moduleConst.receipt, paras)
      .then(data => res.status(200).json(Pagination.handle(data, req)))
      .catch(err => res.status(400).json(err));
  }

  static count(req, res) {
    Operator
      .count(moduleConst.receipt, null)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.receipt, moduleConst.receipt, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;

    Operator
      .createNew(moduleConst.receipt, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.receipt, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static multiRemove(req, res) {
    let _data = req.body; //include "_id" and "id"

    Operator
      .multiRemove(moduleConst.receipt, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;

    Operator
      .update(moduleConst.receipt, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;

    Operator
      .upsert(moduleConst.receipt, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static monthlySum(req, res) {
    Operator
      .monthlySum(moduleConst.receipt, moduleConst.receipt)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static yearlySum(req, res) {
    Operator
      .yearlySum(moduleConst.receipt, moduleConst.receipt)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
