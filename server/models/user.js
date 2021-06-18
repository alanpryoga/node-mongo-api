'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  accountNumber: {
    type: Number,
    required: true,
    unique: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  identityNumber: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
