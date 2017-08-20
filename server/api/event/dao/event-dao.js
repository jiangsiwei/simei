'use strict';

let mongoose = require("mongoose");
const eventSchema = require("../model/event-model");
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
