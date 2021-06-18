'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  authenticate(req, res, next) {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return res.status(401)
        .send({
          status: 'error',
          message: 'Authorization token is missing.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        return res.status(403)
          .send({
            status: 'error',
            message: error.message
          });
      }

      next();
    });
  }
}
