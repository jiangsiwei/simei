"use strict";

let mongoose = require("mongoose");
const payeeSchema = require("../model/payee-model");
const Payee = mongoose.model("Payee", payeeSchema);

module.exports = Payee;
