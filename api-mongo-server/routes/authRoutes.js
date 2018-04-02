const mongoose = require('mongoose');
const _ = require('lodash');
var { User } = require('../models/User');

module.exports = app => {
  app.get('/api/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).send({ message: 'Success' });
  });

  app.post('/api/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        req.session.user = user._id;
        res.status(200).send(user);
      })
      .catch(e => {
        res.status(400).send();
      });
  });
};
