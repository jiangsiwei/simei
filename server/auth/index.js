"use strict";

var express = require('express');
var passport = require('passport');
var config = require('../constants/env.json');
var User = require('../api/user/dao/user-dao.js');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
