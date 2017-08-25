'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require("lodash");
const EventDAO = require("../dao/event-dao");
const moduleConst = require("../../../constants/module.js");
const Operator = require("../../../components/operator/operator.js");
const Pagination = require("../../../components/utils/pagination.js");
const Event = require("../../../components/module/event.js");
const Merit = require("../../../components/utils/merit.js")

const postHandle = (data) => {
  const single = (data) => {
    const val = new Event(data);
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

module.exports = class EventController {
  static getAll(req, res) {
    Operator
      .getAll(moduleConst.event, moduleConst.event)
      .then(data => res.status(200).json(Pagination.handle(data, req)))
      .catch(err => res.status(400).json(err));
  }

  static count(req, res) {
    Operator
      .getAll(moduleConst.event, null)
      .then(data => res.status(200).json({
        total: Pagination.getCount(data, req)
      }))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    Operator
      .getById(moduleConst.event, moduleConst.event, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static createNew(req, res) {
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .createNew(moduleConst.event, _data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static deleteById(req, res) {
    let _id = req.params.id;

    Operator
      .deleteById(moduleConst.event, _id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static multiRemove(req, res) {
    let _data = req.body; //include "_id" and "id"

    Operator
      .multiRemove(moduleConst.event, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static update(req, res) {
    let _id = req.params.id;
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .update(moduleConst.event, _id, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static upsert(req, res) {
    let _data = req.body;
    _data = postHandle(_data);

    Operator
      .upsert(moduleConst.event, _data)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static summary(req, res) {
    Operator
      .getAll(moduleConst.event, moduleConst.event)
      .then((data) => {
        const merit = new Merit(data)
        const summary = merit.findSummary()
        res.status(200).json(summary)
      })
      .catch(err => res.status(400).json(err));
  }
}
