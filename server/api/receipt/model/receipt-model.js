"use strict";

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _receiptSchema = {
  id: {
    type: String,
    required: true,
    trim: true
  },
  payee: {
    type: _schema.ObjectId,
    ref: 'Payee'
  },
  amount: Number,
  ig: {
    type: String,
    default: 'Karaoke', // if you want to set as default value
    enum: ['Karaoke', 'Ballon', 'SCEC lunch', 'BriskWalk']
  },
  ticketFrom: String,
  ticketTo: String,
  note: String,
  Date: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_receiptSchema);
