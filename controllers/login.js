const User = require('../models/Users')


module.exports = {
    index: (req, res, next) => {
        res.locals.email = ''
        res.locals.error = ''
        res.render('user-acces')
    },
    
    loginPost: async (req, res, next) => {
        try {
            const {email, password} = req.body
    
            const userResponse = await User.findOne({email})
            console.log('USUARIO', userResponse)
            if(!userResponse) {
                res.locals.email = email
                res.locals.error = 'Invalid Credentials'
                res.render('user-acces')
            }

            res.locals.email = email
            res.locals.error = 'Invalid Credentials'
            res.render('user-acces')

        } catch (error) {
            next(error)
        }
    },
    
    createUser: async (req, res, next) => {
            const {email, password} = req.body
            res.locals.email = ''
            res.locals.error = ''
            res.redirect('../user-acces')
    }
}