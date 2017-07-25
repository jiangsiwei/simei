"use strict";

const log = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require("lodash");
//the constant of module
const moduleConst = require('../../constants/module.js');


const populateUser = {
  path: 'role',
  select: ''
};

module.exports = class FindPopulate {
  constructor() {}

  static find(name) {
    let ret = "";
    if (_.eq(name, moduleConst.user)) {
      ret = populateUser;
    }

    return ret;
  }

};
