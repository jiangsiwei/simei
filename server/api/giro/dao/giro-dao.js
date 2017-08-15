'use strict';

let mongoose = require("mongoose");
const giroSchema = require("../model/giro-model");
const Giro = mongoose.model("Giro", giroSchema);

module.exports = Giro;
