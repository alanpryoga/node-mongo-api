'use strict';

const authController = require('../controllers').auth;
const usersController = require('../controllers').users;
const authMiddleware = require('../middlewares').auth;

module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    status: 'ok',
    message: 'Hello, world!'
  }));

  // authentication routes
  app.post('/auth/token/create', authController.create);

  // user routes
  app.post('/users', authMiddleware.authenticate, usersController.create);
  app.get('/users', authMiddleware.authenticate, usersController.list);
  app.get('/users/accountnumber/:accountNumber', authMiddleware.authenticate, usersController.getByAccountNumber);
  app.get('/users/identitynumber/:identityNumber', authMiddleware.authenticate, usersController.getByIdentityNumber);
  app.put('/users/:id', authMiddleware.authenticate, usersController.update);
  app.delete('/users/:id', authMiddleware.authenticate, usersController.destroy);
};
