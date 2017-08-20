'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');
const Event = require('../module/Event')

module.exports = class Merit {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
      this.summary = [] //{'memberId': point}
    }
  }

  findPoint(member, point) {
    const memberId = _.get(member, 'id')
    if (_.isNil(memberId)) {
      return
    }

    const idx = _.findIndex(this.summary, (s) => {
      return memberId == _.get(s.member, 'id')
    })
    if (idx < 0) {
      this.summary.push({
        'member': member,
        'point': point
      })
    } else {
      this.summary[idx].point += point
    }
  }

  findSummary() {
    this.summary = []
    _.forEach(this.getData(), (d) => {
      const event = new Event(d)
      this.findPoint(event.getChairman(), 2.0)
      _.forEach(event.getCommittee(), com => this.findPoint(com, 1.0))
      _.forEach(event.getVolunteer(), vol => this.findPoint(vol, 0.5))
    })

    // logger.debug('summary = ', this.summary)
    return this.summary
  }

  getData() {
    return this.data;
  }
}
