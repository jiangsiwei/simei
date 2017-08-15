'use strict';

let mongoose = require("mongoose");
const pvSchema = require("../model/pv-model");
const Pv = mongoose.model("Pv", pvSchema);

module.exports = Pv;
