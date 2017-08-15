'use strict';

let mongoose = require("mongoose");
const personSchema = require("../model/person-model");
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
