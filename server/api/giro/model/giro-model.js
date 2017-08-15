'use strict';

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _giroSchema = {
  id: { //invoice id
    type: String,
    required: true,
    trim: true
  },
  payee: {
    type: _schema.ObjectId,
    ref: 'Person'
  },
  particulars: String,
  total: Number,
  createdBy: String,
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_giroSchema);
