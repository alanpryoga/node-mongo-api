'use strict';

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');

  // load environtment variables
  dotenv.config();
}

// initialize app instance
const app = express();

// setup logger
app.use(logger('dev'));

// parse requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// load router
require('./server/routes')(app);

module.exports = app;
