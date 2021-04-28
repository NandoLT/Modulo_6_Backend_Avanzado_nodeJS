'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema ({
    email: {
        type:String, 
        unique: true
    },
    password: String
});

userSchema.statics.hashPassword  = function (plainTextPassword) {
    return bcrypt.hash(plainTextPassword, 10);
}

userSchema.methods.comparePassword = async function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password)
}


const User = mongoose.model('User', userSchema);



module.exports = User;