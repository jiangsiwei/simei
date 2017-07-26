"use strict";

const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheese: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'debug'
    }
  }
});
const logger = require('log4js').getLogger(__filename.slice(__dirname.length + 1));

// const Logger = require('./components/utils/logger');
// const logger = new Logger(__filename.slice(__dirname.length + 1)).getLogger();

if (process.env.NODE_ENV === "production")
  require("newrelic");

const PORT = process.env.PORT || 3333;

const os = require("os");
const http = require("http");
const express = require("express");
const RoutesConfig = require("./config/routes.conf");
const DBConfig = require("./config/db.conf");
const Routes = require("./routes/index");

const app = express();

RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

http.createServer(app)
  .listen(PORT, () => {
    console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
    console.log(`enviroment: ${process.env.NODE_ENV}`);
  });
