'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const emailTransport = require('../libs/emailTransport')

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

userSchema.methods.sendEmail = async function (subject, body) {

    console.log('enviando email')

    const transport = await emailTransport()
    
    return transport.sendMail({
        from: process.env.EMAIL_SERVICE_FROM, 
        to: this.email,
        subject: subject,
        html: body
    })
}

const User = mongoose.model('User', userSchema);



module.exports = User;