const User = require('../models/Users')
// const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

module.exports = {
    index: (req, res, next) => {
        res.locals.email = ''
        res.locals.error = ''
        res.locals.rememberPasswordSend = ''
        res.render('user-acces')
    },
    
    loginPost: async (req, res, next) => {
        try {
            const {email, password} = req.body
    
            const userResponse = await User.findOne({email})

            if(!userResponse || !(await userResponse.comparePassword(password))) {
                res.locals.email = email
                res.locals.error = 'Invalid Credentials'
                res.locals.rememberPasswordSend = ''
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

    rememberPassword: async (req, res, next) => {
        // TODO:  remember password
        // TODO:  formulario para que indique el correo para la recupeación de contraseña
        const email = req.body.email

        const userEmail = await User.findOne({email})
            if(userEmail) {
                console.log('email de usuario existe')
                // TODO: Implementar envio de email para recuperar contraseña (en realidad cambiarla)
                rememberPasswordSend = res.__('The email has been sent.please check your inbox and follow the instructions')
                res.render('recover_password', {
                    rememberPasswordSend,
                    email: userEmail.email})
            } else {
                console.log('email de usuario NO existe')
                rememberPasswordSend = res.__('Incorrect Email to recover password')
                res.render('recover_password', {
                    rememberPasswordSend,
                    email: null
                })
            }
        
    },
    
    recoverPassword: (req, res, next) => {
        res.render('recover_password')
    },

    modifyPassword: (req, res, next) => {
        res.send('Modificar contraseña')
    },

    createUser: async (req, res, next) => {
        // TODO:  implementar crear usuario
            const {email, password} = req.body
            res.locals.email = ''
            res.locals.error = ''
            res.locals.rememberPasswordSend = ''
            res.redirect('../user-acces')
    }
}