const User = require('../../models/Users')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res, next) => {
        try {
            const {email, password} = req.body
    
            const userResponse = await User.findOne({email})
            if(!userResponse || !(await userResponse.comparePassword(password))) {
                const error= new Error('Invalid Credentials')
                error.status = 401
                next(error)
                return
            }
            
            jwt.sign({_id: userResponse._id}, process.env.JWT_SECRET, {expiresIn: '2h'}, (err, jwtToken) => {
                if (err) {
                    next(err)
                    return
                }
                res.json({
                    token: jwtToken
                })
            })

        } catch (error) {
            next(error)
        }
    }
}