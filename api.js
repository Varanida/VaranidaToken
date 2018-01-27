'use strict';

/**
 * ==============================================
 * Module dependencies.
 * ==============================================
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const contract = require("truffle-contract");
const validator = require("validator");
const moment = require("moment");

/**
 * ==============================================
 * Initializing application.
 * ==============================================
 */

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * ==============================================
 * Initializing models and routes.
 * ==============================================
 */
let router = express.Router();

require('./modules/balance/BalanceRoutes')(router);
require('./modules/minting/MintingRoutes')(router);

app.use('/api', router);


/**
 * ==============================================
 * Error handlers.
 * ==============================================
 */
app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).end("DOCUMENT NOT FOUND");
});

/**
 * ==============================================
 * Export app for test purposes.
 * ==============================================
 */
module.exports = app;
