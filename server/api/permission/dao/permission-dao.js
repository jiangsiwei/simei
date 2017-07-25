"use strict";

let mongoose = require("mongoose");
const permissionSchema = require("../model/permission-model");
const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
