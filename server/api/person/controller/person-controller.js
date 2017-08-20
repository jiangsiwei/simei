'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const PersonDAO = require("../dao/person-dao");
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const Pagination = require("../../../components/utils/pagination.js");
const Person = require("../../../components/module/person.js");
const _ = require("lodash");

const postHandle = (data) => {
  const single = (data) => {
    const val = new Person(data);
    val.findId();
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

module.exports = class PersonController {
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
      .getAll(moduleConst.person, moduleConst.person, paras)
      .then((data) => {
        const ret = Pagination.handle(data, req)
        res.status(200).json(_.sortBy(ret, t => t.id))
      })
      .catch(err => res.status(400).json(err));
  }

  static count(req, res) {
    Operator
      .count(moduleConst.person, null)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.person, moduleConst.person, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .createNew(moduleConst.person, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.person, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static multiRemove(req, res) {
    let _data = req.body; //include "_id" and "id"

    Operator
      .multiRemove(moduleConst.person, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .update(moduleConst.person, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .upsert(moduleConst.person, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }
}
