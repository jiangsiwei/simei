'use strict';

let mongoose = require("mongoose");
const memberSchema = require("../model/member-model");
const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
