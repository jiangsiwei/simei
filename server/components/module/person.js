'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');
const Record = require('../utils/record.js');

module.exports = class Person {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
    }
  }

  //the id is same as the name
  findId() {
    this.setId(this.getName());
  }

  findAddress() {
    return _.join([this.getFloor(), this.getBlock(), this.getStreet(), this.getState(), this.getPostal()], ', ');
  }

  getId() {
    return this.data.id;
  }

  setId(val) {
    this.data.id = val;
  }

  getName() {
    return this.data.name;
  }

  setName(val) {
    this.data.name = val;
  }

  getFloor() {
    return this.data.floor;
  }

  setFloor(val) {
    this.data.floor = val;
  }

  getBlock() {
    return this.data.block;
  }

  setBlock(val) {
    this.data.block = val;
  }

  getStreet() {
    return this.data.street;
  }

  setStreet(val) {
    this.data.street = val;
  }

  getPostal() {
    return this.data.postal;
  }

  setPostal(val) {
    this.data.postal = val;
  }

  getState() {
    return this.data.state;
  }

  setState(val) {
    this.data.state = val;
  }

  getData() {
    return this.data;
  }
}
