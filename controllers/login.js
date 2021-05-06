const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


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
            // si el usuario existe y la clave coincide
            // apuntar en la sesión del usuario su _id
            req.session.userLogged = {
                _id: userResponse._id
            }

            // Envío Email al usuario para informar de un nuevo inicio de sesión
                const info = await userResponse.sendEmail('Nuevo acceso a nodepop', `El usuario ${userResponse.email} ha iniciado una nueva sesión`)
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
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

    rememberPassword: (req, res, next) => {
        // TODO:  remember password
        //formulario para que indique el correo para la recupeación de contraseña
        // Se envía una url con los datos en query para indicarle password o cambiarla ya vere
        res.send('Estoy recuperando password')
    },
    
    createUser: async (req, res, next) => {
            const {email, password} = req.body
            res.locals.email = ''
            res.locals.error = ''
            res.redirect('../user-acces')
    }
}