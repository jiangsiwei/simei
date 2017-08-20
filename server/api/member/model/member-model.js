'use strict';

const mongoose = require("mongoose");

const _memberSchema = {
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
  role: {
    type: String,
    default: 'Executive Member', // if you want to set as default value
    enum: ['Chairman', 'Secretary', 'Assistant Secretary', 'Treasurer', 'Assistant Treasurer',
      'Auditor', 'Executive Member', 'Grassroots Member', 'Observer', 'Immediate Past Chairman',
      'RC manager', 'Others'
    ]
  },
  zone: {
    type: String,
    default: 'Simei Zone 3', // if you want to set as default value
    enum: ['Simei Zone 3']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}

module.exports = mongoose.Schema(_memberSchema);
