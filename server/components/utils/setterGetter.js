'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');

module.exports = class SetterGetter {
  constructor(vars) {
    this.vars = vars
  }

  generate() {
    var ret = ''
    _.forEach(this.vars, (v) => {
      var setter = 'set' + _.toUpper(v[0]) + v.substring(1, _.size(v)) + '(' + v + '){\n'
      setter += '    this.data.' + v + ' = ' + v + ';\n'
      setter += '}\n\n'

      var getter = 'get' + _.toUpper(v[0]) + v.substring(1, _.size(v)) + '(){\n'
      getter += '    return this.data.' + v + ';\n'
      getter += '}\n\n'

      ret += setter + getter
    })

    logger.debug(ret)

    return ret
  }

}
