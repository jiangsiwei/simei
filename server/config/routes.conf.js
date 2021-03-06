'use strict';

const morgan = require("morgan");
const bodyParser = require("body-parser");
const contentLength = require("express-content-length-validator");
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");
const zlib = require("zlib");
const cors = require('cors');

module.exports = class RouteConfig {
  static init(application) {
    let _root = process.cwd();
    let _nodeModules = "/node_modules/";
    let _jspmPackages = "/jspm_packages/";
    let _clientFiles = (process.env.NODE_ENV === "production") ? "/client/dist/" : "/client/dev/";

    application.use(compression({
      level: zlib.Z_BEST_COMPRESSION,
      threshold: "1kb"
    }));

    application.use(express.static(_root + _nodeModules));
    application.use(express.static(_root + _jspmPackages));
    application.use(express.static(_root + _clientFiles));
    application.use(bodyParser.json({
      limit: '50mb'
    })); //limit is 5mb
    application.use(morgan("dev"));
    application.use(contentLength.validateMax({
      max: 99999999
    })); //max: 999
    application.use(helmet());

    //the middleware function, authenticate
    application.use('/api/auth', require('../auth/index'));

    //add the cors
    application.use(cors());
  }
}
