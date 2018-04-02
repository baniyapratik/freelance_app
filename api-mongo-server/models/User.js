const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  firstName: String,
  lastName: String,
  phone: { type: String, default: null },
  about: { type: String, default: null },
  Skills: { type: String, default: null }
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, [
    '_id',
    'email',
    'firstName',
    'lastName',
    'Skills',
    'about',
    'phone'
  ]);
};
UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});
var User = mongoose.model('User', UserSchema);

module.exports = { User };
