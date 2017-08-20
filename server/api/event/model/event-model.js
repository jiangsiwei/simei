'use strict';

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _eventSchema = {
  id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: String,
  date: {
    type: Date,
    default: Date.now
  },
  chairman: {
    type: _schema.ObjectId,
    ref: 'Member'
  },
  committee: [{
    type: _schema.ObjectId,
    ref: 'Member'
  }],
  volunteer: [{
    type: _schema.ObjectId,
    ref: 'Member'
  }],
  note: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_eventSchema);
