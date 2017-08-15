'use strict';

const UserDao = require('../dao/user-dao.js');
const Pagination = require("../../../components/utils/pagination.js");

module.exports = class UserController {
  static getAll(req, res) {
    UserDao.getAll()
      .then(data => res.status(200).json(Pagination.handle(data, req)))
      .catch(err => res.status(400).json(err));
  }

  static create(req, res) {
    let _data = req.body;

    UserDao.create(_data)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }

  static getById(req, res) {
    UserDao.getById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static me(req, res) {
    // console.log('req.user._id = ', req.user._id);
    UserDao.me(req.user._id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    UserDao.removeById(_id)
      .then((data) => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  }

  static changePassword(req, res) {
    let userId = req.user._id; //req.user._id
    let oldPass = String(req.body.oldPassword);
    let newPass = String(req.body.newPassword);

    UserDao.changePassword(userId, oldPass, newPass)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(400).json(err));
  }
}
