const express = require('express')
const router = express.Router();

const { 
    index,
    loginPost,
    logout, 
    createUser, 
    rememberPassword, 
    recoverPassword
} = require('../controllers/login')


router.get('/', index)
router.get('/logout', logout)
router.get('/recover_password', recoverPassword)
router.post('/', loginPost)
router.post('/remember-password', rememberPassword ) // modificar a post cuando implementemos el formulario
router.post('/create-user', createUser)


module.exports = router