'use strict';

const User = require('../models/user');

module.exports = {
  create(req, res) {
    // initialize new user instance
    let user = new User(req.body);

    // save user
    return user.save()
      .then(data => res.status(201).send({
        status: 'ok',
        message: 'User created successfully.',
        data: data
      })).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  list(req, res) {
    return User.find({})
      .then(users => {
        return res.status(200).send({
          status: 'ok',
          message: 'Shown list of users.',
          data: users
        });
      }).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  getByAccountNumber(req, res) {
    let accountNumber = req.params.accountNumber;

    return User.findOne({ accountNumber: accountNumber })
      .then(user => {
        // user not found
        if (!user) {
          return res.status(404).send({
            status: 'error',
            message: `User with accountNumber=${accountNumber} not found.`
          })
        }

        return res.status(200).send({
          status: 'ok',
          message: `User with accountNumber=${accountNumber} found.`,
          data: user
        });
      }).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  getByIdentityNumber(req, res) {
    let identityNumber = req.params.identityNumber;

    return User.findOne({ identityNumber: identityNumber })
      .then(user => {
        // user not found
        if (!user) {
          return res.status(404).send({
            status: 'error',
            message: `User with identityNumber=${identityNumber} not found.`
          })
        }

        return res.status(200).send({
          status: 'ok',
          message: `User with identityNumber=${identityNumber} found.`,
          data: user
        });
      }).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  update(req, res) {
    let id = req.params.id;

    return User.findByIdAndUpdate(id, req.body, { new: true })
      .then(user => {
        // user not found
        if (!user) {
          return res.status(404).send({
            status: 'error',
            message: `User with _id=${id} not found.`
          })
        }

        return res.status(200).send({
          status: 'ok',
          message: `User with _id=${id} updated.`,
          data: user
        });
      }).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  },

  destroy(req, res) {
    let id = req.params.id;

    return User.findByIdAndDelete(id)
      .then(user => {
        // user not found
        if (user == null) {
          return res.status(404).send({
            status: 'error',
            message: `User with _id=${id} not found.`
          });
        };

        return res.status(204).send({})
      }).catch(error => res.status(400).send({
        status: 'error',
        message: error.message
      }));
  }
};
