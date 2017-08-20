'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');
const Record = require('../utils/record.js');

module.exports = class Event {
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

  setId(id) {
    this.data.id = id;
  }

  getId() {
    return this.data.id;
  }

  setName(name) {
    this.data.name = name;
  }

  getName() {
    return this.data.name;
  }

  setChairman(chairman) {
    this.data.chairman = chairman;
  }

  getChairman() {
    return this.data.chairman;
  }

  setCommittee(committee) {
    this.data.committee = committee;
  }

  getCommittee() {
    return this.data.committee;
  }

  setVolunteer(volunteer) {
    this.data.volunteer = volunteer;
  }

  getVolunteer() {
    return this.data.volunteer;
  }

  getData() {
    return this.data;
  }
}
