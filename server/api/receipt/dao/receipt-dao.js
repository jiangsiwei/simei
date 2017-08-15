'use strict';

let mongoose = require("mongoose");
const receiptSchema = require("../model/receipt-model");
const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
