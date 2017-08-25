'use strict';

const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));
const _ = require('lodash');
const Person = require('../module/person.js');
const PaymentVoucher = require('../module/paymentVoucher.js');
const Time = require('../utils/time.js');
const WorkbookUtils = require('../utils/workbookUtils.js');
const XLSX = require('xlsx');
const Workbook = require('workbook');

module.exports = class ExportPV {
  constructor(data) {
    if (data == null) {
      logger.debug('Input data is null');
    } else {
      this.data = data;
    }
    this.wbu = new WorkbookUtils();
  }

  findExcelData(data) {
    const findFloor = (data) => {
      if (_.isArray(data)) {
        return _.map(data, val => _.floor(val));
      } else {
        return _.floor(data);
      }
    }

    const findFraction = (data) => {
      const frac = (data) => {
        var ret = 100 * _.round(_.subtract(data, _.floor(data)), 2)
        return _.padStart(ret, 2, '0')
      }
      if (_.isArray(data)) {
        return _.map(data, val => frac(val));
      } else {
        return frac(data);
      }
    }

    const sheet = (data) => {
      var paymentVoucher = new PaymentVoucher(data);
      var payee = new Person(paymentVoucher.getPayee());
      var time = new Time();

      return {
        pvId: paymentVoucher.getPvId(),
        payeeName: payee.getName(),
        payeeAddress: payee.findAddress(),
        date: time.format(paymentVoucher.getDate()),
        chequeId: paymentVoucher.getChequeId(),
        amountWord: paymentVoucher.getAmountWord(),
        createdBy: paymentVoucher.getCreatedBy(),
        account: paymentVoucher.getAccount(),
        documentNo: paymentVoucher.getDocumentNo(),
        particulars: paymentVoucher.getParticulars(),
        amount: paymentVoucher.getAmount(),
        amountInt: findFloor(paymentVoucher.getAmount()),
        amountFrac: findFraction(paymentVoucher.getAmount()),
        total: paymentVoucher.getTotal(),
        totalInt: findFloor(paymentVoucher.getTotal()),
        totalFrac: findFraction(paymentVoucher.getTotal()),
      }
    }

    if (!_.isArray(data)) {
      data = [data]
    }

    return _.map(data, (val) => {
      const data = sheet(val);
      return {
        name: data.pvId,
        data: data
      };
    });
  }

  findSheet(wb, name, data) {
    const setPVId = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col, 'S/No.D');
      this.wbu.fillField(wb, name, row, col + 1, row, col + 1, data.pvId, 'bottomBorder');
    }

    const setTitle = (row, col) => {
      wb.setCell(name, row, col, {
        v: 'PAYMENT VOUCHER',
        s: {
          font: {
            name: "Times New Roman",
            sz: 20,
            bold: true
          },
          alignment: {
            horizontal: "center"
          }
        }
      });
      //merge cells
      this.wbu.mergeCells(wb, name, row, col, row, col + 6);

      wb.setCell(name, row + 1, col, {
        v: 'RESIDENTS COMMITTEE',
        s: {
          font: {
            name: "Times New Roman",
            sz: 12,
            bold: true
          },
          alignment: {
            horizontal: 'center'
          }
        }
      });
      //merge cells
      this.wbu.mergeCells(wb, name, row + 1, col, row + 1, col + 6);
    };

    const setPayee = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col, 'Payee');
      this.wbu.fillField(wb, name, row, col + 1, row, col + 4, data.payeeName, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 1, col + 1, row + 2, col + 4, data.payeeAddress, 'bottomBorder');
      //set date
      this.wbu.fillField(wb, name, row + 2, col + 7, row + 2, col + 7, 'Date');
      this.wbu.fillField(wb, name, row + 2, col + 8, row + 2, col + 8, data.date, 'bottomBorder');
    }

    const setTableTitle = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row + 1, col, 'Account', 'allBorder');
      this.wbu.fillField(wb, name, row, col + 1, row + 1, col + 1, 'Document No.', 'allBorder');
      this.wbu.fillField(wb, name, row, col + 2, row + 1, col + 4, 'particulars', 'allBorder');
      this.wbu.fillField(wb, name, row, col + 5, row, col + 6, 'Amount', 'allBorder');
      this.wbu.fillField(wb, name, row + 1, col + 5, row + 1, col + 5, '$', 'allBorder');
      this.wbu.fillField(wb, name, row + 1, col + 6, row + 1, col + 6, 'C', 'allBorder');
    }

    const setTableContent = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col, data.account, 'allBorder');
      this.wbu.fillField(wb, name, row, col + 1, row, col + 1, data.documentNo, 'allBorder');
      this.wbu.fillField(wb, name, row, col + 2, row, col + 4, data.particulars, 'allBorder');
      this.wbu.fillField(wb, name, row, col + 5, row, col + 5, data.amountInt, 'allBorder');
      this.wbu.fillField(wb, name, row, col + 6, row, col + 6, data.amountFrac, 'allBorder');
    }

    const setTableEmptyContent = (row, col) => {
      for (let i = 0; i < 4; i++) {
        this.wbu.fillField(wb, name, row + i, col, row + i, col, '', 'allBorder');
        this.wbu.fillField(wb, name, row + i, col + 1, row + i, col + 1, '', 'allBorder');
        this.wbu.fillField(wb, name, row + i, col + 2, row + i, col + 4, '', 'allBorder');
        this.wbu.fillField(wb, name, row + i, col + 5, row + i, col + 5, '', 'allBorder');
        this.wbu.fillField(wb, name, row + i, col + 6, row + i, col + 6, '', 'allBorder');
      }
    }

    const setTableTotal = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col, 'Total', 'allBorder');
      this.wbu.fillField(wb, name, row, col + 1, row, col + 1, data.totalInt, 'allBorder');
      this.wbu.fillField(wb, name, row, col + 2, row, col + 2, data.totalFrac, 'allBorder');
    }

    const setCash = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col + 1, 'Cash/Crossed Cheque No.');
      this.wbu.fillField(wb, name, row, col + 2, row, col + 7, 'DBS ' + data.chequeId, 'bottomBorder');
    }

    const setCashWord = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col + 1, 'Amount in Words.');
      this.wbu.fillField(wb, name, row, col + 2, row, col + 7, data.amountWord, 'bottomBorder');
    }

    const setAuthor = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col + 2, 'Prepared/Certified coorected by:');
      this.wbu.fillField(wb, name, row, col + 3, row, col + 7, data.createdBy, 'bottomBorder');
    }

    const setChequeLeft = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col + 1, data.date, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 1, col, row + 1, col + 1, data.payeeName, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 2, col, row + 3, col + 1, data.particulars, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 4, col, row + 4, col + 1, data.total, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 5, col, row + 5, col + 1, data.pvId, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 6, col, row + 6, col + 1, 'DBS ' + data.chequeId, 'bottomBorder');
    }

    const setChequeRight = (row, col) => {
      this.wbu.fillField(wb, name, row, col, row, col, 'Pay');
      this.wbu.fillField(wb, name, row, col + 1, row, col + 2, data.payeeName, 'bottomBorder');
      this.wbu.fillField(wb, name, row, col + 6, row, col + 6, data.date, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 1, col, row + 1, col, 'Singapore');
      this.wbu.fillField(wb, name, row + 2, col, row + 2, col, 'Dollar');
      this.wbu.fillField(wb, name, row + 1, col + 1, row + 2, col + 3, data.amountWord, 'bottomBorder');
      this.wbu.fillField(wb, name, row + 1, col + 4, row + 2, col + 5, 'S$' + data.total, 'allBorder');

    }

    setPVId(0, 7);
    setTitle(1, 1);
    setPayee(4, 0);
    setTableTitle(9, 1);
    setTableContent(11, 1);
    setTableEmptyContent(12, 1);
    setTableTotal(16, 5);
    setCash(19, 1);
    setCashWord(20, 1);
    setAuthor(21, 1);

    //for cheque
    setChequeLeft(26, 0);
    setChequeRight(26, 2);

    // //set width
    // wb.setColWidthChars(name, 1, 72);
  }

  getSheets(next) {
    const data = this.findExcelData(this.data);

    var wb = new Workbook();
    _.forEach(data, (t) => {
      this.findSheet(wb, t.name, t.data);
    });
    wb.finalize();

    // //write workbook
    // const OUTFILE = 'pvTmp.xlsx';
    // XLSX.writeFile(wb, OUTFILE);

    const ret = XLSX.write(wb, {
      type: 'base64'
    });
    next(ret)
  }

  getData() {
    return this.data;
  }

}
