const express = require('express')
const router = express.Router();

const { 
    index,
    loginPost,
    logout, 
    createUser, 
    rememberPassword
} = require('../controllers/login')


router.get('/', index)
router.get('/logout', logout)
router.post('/', loginPost)
router.get('/remember-password', rememberPassword ) // modificar a post cuando implementemos el formulario
router.post('/create-user', createUser)


module.exports = router