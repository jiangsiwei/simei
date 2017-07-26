"use strict";

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _pvSchema = {
  id: {
    type: String,
    required: true,
    trim: true
  },
  pvId: {
    type: String,
    required: true,
    trim: true
  },
  chequeId: {
    type: String,
    required: true,
    trim: true
  },
  payee: {
    type: _schema.ObjectId,
    ref: 'Payee'
  },
  account: String,
  documentNo: String,
  particulars: String,
  amount: [Number],
  total: Number,

  amountWord: String,
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_pvSchema);
