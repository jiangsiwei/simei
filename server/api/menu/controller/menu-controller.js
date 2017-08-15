'use strict';

const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");

module.exports = class menuController {
  static getAll(req, res) {
    Operator
      .getAll(moduleConst.menu, moduleConst.menu)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.menu, moduleConst.menu, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;

    Operator
      .createNew(moduleConst.menu, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.menu, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;

    Operator
      .update(moduleConst.menu, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;

    Operator
      .upsert(moduleConst.menu, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
