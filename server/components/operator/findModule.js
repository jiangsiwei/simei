"use strict";

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require("lodash");
//the constant of module
const moduleConst = require('../../constants/module.js');
//we are testing here, cannot define vehileDAO
const TodoDAO = require('../../api/todo/dao/todo-dao.js');
const PayeeDAO = require('../../api/payee/dao/payee-dao.js');
const PvDAO = require('../../api/pv/dao/pv-dao.js');

//for user, permission, menu
const MenuDAO = require('../../api/menu/dao/menu-dao.js');
const PermissionDAO = require('../../api/permission/dao/permission-dao.js');
const UserDAO = require('../../api/user/dao/user-dao.js');
const ReceiptDAO = require('../../api/receipt/dao/receipt-dao.js');

module.exports = class FindModule {

  static find(name) {
    let ret = null;
    if (_.eq(name, moduleConst.todo)) {
      ret = TodoDAO;
    } else if (_.eq(name, moduleConst.menu)) {
      ret = MenuDAO;
    } else if (_.eq(name, moduleConst.permission)) {
      ret = PermissionDAO;
    } else if (_.eq(name, moduleConst.user)) {
      ret = UserDAO;
    } else if (_.eq(name, moduleConst.payee)) {
      ret = PayeeDAO;
    } else if (_.eq(name, moduleConst.pv)) {
      ret = PvDAO;
    } else if (_.eq(name, moduleConst.receipt)) {
      ret = ReceiptDAO;
    }

    return ret;
  }
}
