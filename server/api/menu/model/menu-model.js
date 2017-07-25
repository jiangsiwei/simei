"use strict";

const mongoose = require("mongoose");
const _schema = mongoose.Schema;

const _menuSchema = {
  id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  icon: String,
  name: String,
  route: String,
  bpid: String,
  mpid: String
}

module.exports = mongoose.Schema(_menuSchema);
