const mongoose = require('mongoose');
const key = require('../config/key');

mongoose.connect(key.mongoURI);
//console.log(mongoose.connection.readyState);

module.exports = { mongoose };
