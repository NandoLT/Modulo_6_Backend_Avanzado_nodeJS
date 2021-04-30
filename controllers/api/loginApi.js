const User = require('../../models/Users')
const jwt = require('jsonwebtoken')

module.exports = {
    index: (req, res, next) => {
        res.render('login-api')
    },

    login: async (req, res, next) => {
        console.log('Enviando credenciales')
        try {
            const {email, password} = req.body

            const userResponse = await User.findOne({email})

            if(!userResponse || !(await userResponse.comparePassword(password))) {
                const error= new Error('Invalid Credentials')
                error.status = 401
                next(error)
                return
            }
            //TODO  implementar refresh token para mayor autenticación
            jwt.sign({_id: userResponse._id}, process.env.JWT_SECRET, {expiresIn: '2h'}, async (err, jwtToken) => {
                if (err) {
                    next(err)
                    return
                }
                
                res.json({
                    msg: 'Token Created',
                    token: jwtToken,
                    Instructions: {
                        Postman: 'Now you can make a GET/POST into Postman. You must include this token into the header',
                        POST: '/api/products',
                        GET_PRODUCTS: '/api/products',
                        GET_TAGS:'/api/products/tags'
                    }       
                })
            })

        } catch (error) {
            next(error)
        }
    }
}