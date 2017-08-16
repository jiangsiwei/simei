'use strict';

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _receiptSchema = {
  id: {
    type: String,
    required: true,
    trim: true
  },
  payer: {
    type: _schema.ObjectId,
    ref: 'Person'
  },
  total: Number,
  ig: {
    type: String,
    default: 'Karaoke', // if you want to set as default value
    enum: ['Karaoke', 'Ballon', 'SCEC Lunch', 'Brisk Walk', 'Apple Tree', 'Others']
  },
  ticketFrom: String,
  ticketTo: String,
  note: String,
  date: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_receiptSchema);
