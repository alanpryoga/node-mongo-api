'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    // token will be expired in 5 minutes!
    let token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '300s' });

    res.status(201)
      .send({
        status: 'ok',
        message: 'Token created successfully.',
        data: `Bearer ${token}`
      });
  }
};
