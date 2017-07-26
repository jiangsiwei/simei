"use strict";

const mongoose = require("mongoose");

const _payeeSchema = {
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
  floor: String,
  block: String,
  street: String,
  postal: String,
  state: {
    type: String,
    default: 'Singapore'
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_payeeSchema);
