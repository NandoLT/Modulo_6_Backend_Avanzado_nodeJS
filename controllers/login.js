const User = require('../models/Users')

console.log('Se rompe en controllers')

module.exports = {
    index: (req, res, next) => {
        res.locals.email = ''
        res.locals.error = ''
        res.render('user-acces')
    },
    
    loginPost: (req, res, next) => {
        const {email, password} = req.body
        res.locals.email = email
        res.locals.error = 'Invalid Credentials'
        res.render('user-acces')
    },
    
    createUser: (req, res, next) => {
        console.log('HACEMOS REGISTRO DE USUARIO')
        res.locals.email = ''
        res.locals.error = ''
        const {email, password} = req.body
        console.log(email, password)
        res.render('user-acces')
    }
}