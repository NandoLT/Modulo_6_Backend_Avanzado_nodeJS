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
            if(!userResponse || !(await userResponse.comparePassword(password))) {
                res.locals.email = email
                res.locals.error = 'Invalid Credentials'
                res.render('user-acces')
                return
            }
            // si eñ usuario existe y la clave coincide
            // apuntar en la sesión del usuario su _id
            req.session.userLogged = {
                _id: userResponse._id
            }
            //Redirigir a zona privada
            res.redirect('/')

        } catch (error) {
            next(error)
        }
    },

    logout: (req, res, next) => {
        req.session.regenerate(err => { // también se puede user destroy que elimina la sesión por completo.
            if(err) {
                next(err)
                return
            }
            res.redirect('../user-acces')
        })
    },
    
    createUser: async (req, res, next) => {
            const {email, password} = req.body
            res.locals.email = ''
            res.locals.error = ''
            res.redirect('../user-acces')
    }
}