"use strict";

let mongoose = require("mongoose");
const todoSchema = require("../model/todo-model");
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
