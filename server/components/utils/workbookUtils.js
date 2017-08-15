'use strict';

const _ = require('lodash');
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

module.exports = class WorkbookUtils {
  constructor() {
    //the possibe border styles
    this.styles = ['bottomBorder', 'allBorder']
    this.bottomBorder = {
      border: {
        bottom: {
          style: 'thin'
        }
      },
      alignment: {
        wrapText: 1,
        alignment: 'center',
        horizontal: 'center',
        vertical: 'center'
      }
    };

    this.allBorder = {
      border: {
        top: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        }
      },
      alignment: {
        wrapText: 1,
        alignment: 'center',
        horizontal: 'center',
        vertical: 'center'
      }
    };
  }

  findBorder(borderParas) {
    let ret = null
    if (_.lowerCase(this.styles[0]) === _.lowerCase(borderParas)) {
      ret = this.bottomBorder
    } else if (_.lowerCase(this.styles[1]) === _.lowerCase(borderParas)) {
      ret = this.allBorder
    }

    return ret
  }

  mergeCells(wb, name, sr, sc, er, ec) {
    wb.mergeCells(name, {
      s: {
        "r": sr,
        "c": sc
      },
      "e": {
        "r": er,
        "c": ec
      }
    });
  }

  fillField(wb, name, rowFrom, colFrom, rowTo, colTo, val, borderParas = null) {
    const border = this.findBorder(borderParas)
    // logger.debug('border: ', border)
    wb.setCell(name, rowFrom, colFrom, {
      v: val,
      s: border
    });
    for (let i = rowFrom; i <= rowTo; i++) {
      for (let j = colFrom; j <= colTo; j++) {
        if (i != rowFrom || j != colFrom) {
          wb.setCell(name, i, j, {
            v: '',
            s: border
          });
        }
      }
    }
    this.mergeCells(wb, name, rowFrom, colFrom, rowTo, colTo);
  }


}
