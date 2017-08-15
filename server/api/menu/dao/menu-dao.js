'use strict';

let mongoose = require("mongoose");
const menuSchema = require("../model/menu-model");
const menu = mongoose.model("menu", menuSchema);

module.exports = menu;
