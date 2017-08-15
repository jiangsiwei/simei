'use strict';

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _permissionSchema = {
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  visit: [String]
}

module.exports = mongoose.Schema(_permissionSchema);
