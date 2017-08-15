'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require("lodash");
//the constant of module
const moduleConst = require('../../constants/module.js');


const populateUser = {
  path: 'role',
  select: ''
};

const populatePv = {
  path: 'payee',
  select: ''
};

const populateGiro = {
  path: 'payee',
  select: ''
};

const populateReceipt = {
  path: 'payer',
  select: ''
};

module.exports = class FindPopulate {
  constructor() {}

  static find(name) {
    let ret = "";
    if (_.eq(name, moduleConst.user)) {
      ret = populateUser;
    } else if (_.eq(name, moduleConst.pv)) {
      ret = populatePv;
    } else if (_.eq(name, moduleConst.giro)) {
      ret = populateGiro;
    } else if (_.eq(name, moduleConst.receipt)) {
      ret = populateReceipt;
    }

    return ret;
  }

};
