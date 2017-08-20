'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const TodoDAO = require("../dao/todo-dao");
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const SetterGetter = require("../../../components/utils/setterGetter.js");

module.exports = class TodoController {
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
      .getAll(moduleConst.todo, moduleConst.todo, paras)
      .then((data) => {
        const sg = new SetterGetter(['id', 'name', 'chairman', 'committee', 'volunteer'])
        sg.generate()
        res.status(200).json(data)
      })
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.todo, moduleConst.todo, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;

    Operator
      .createNew(moduleConst.todo, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.todo, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;

    Operator
      .update(moduleConst.todo, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;

    Operator
      .upsert(moduleConst.todo, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
