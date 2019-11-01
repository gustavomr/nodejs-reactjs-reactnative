const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: String,
    password: String,
    token:String,
});

module.exports = mongoose.model('User', User);