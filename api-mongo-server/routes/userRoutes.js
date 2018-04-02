const mongoose = require('mongoose');
const _ = require('lodash');
var { User } = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = app => {
  app.post('/api/createUser', (req, res) => {
    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
    const { firstName, lastName, email, password } = req.body;
    var user = new User({
      firstName,
      lastName,
      email,
      password
    });
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          console.log(user.password);
        });
      });
    }
    console.log(user);
    user.save(function(err) {
      console.log('Im here');
      if (err) {
        console.log(err);
        return;
      }

      res.send(user);
    });
  });

  app.get('/api/getUserInfo/:userid', (req, res) => {
    const userid = req.params.userid;

    User.find({ _id: userid }, function(err, result) {
      if (err) {
        res.status(401).send({ message: 'Error getting user info' });
      }
      res.status(200).send(result);
    });
  });

  app.post('/api/updateUserInfo/:userid', (req, res) => {
    const firstName = req.body.firstName
      ? req.body.firstName
      : req.body.initial_firstName;

    const lastName = req.body.lastName
      ? req.body.lastName
      : req.body.initial_lastName;

    const email = req.body.email ? req.body.email : req.body.initial_email;
    const phone = req.body.phone ? req.body.phone : req.body.initial_phone;
    const skills = req.body.skills ? req.body.skills : req.body.initial_skills;
    const about = req.body.about ? req.body.about : req.body.initial_about;
    const userid = req.params.userid;
    User.findByIdAndUpdate(
      userid,
      {
        email: email,
        phone: phone,
        about: about,
        Skills: skills,
        firstName: firstName,
        lastName: lastName
      },
      { new: true },
      function(err, result) {
        if (err) {
          res.status(401).send({ message: 'Error Updating' });
        }
        res.status(200).send(result);
      }
    );
  });
};
