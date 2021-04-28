const express = require('express')
const router = express.Router();

const { 
    index,
    loginPost,
    logout, 
    createUser
} = require('../controllers/login')


router.get('/', index)
router.get('/logout', logout)
router.post('/', loginPost)
router.post('/create-user', createUser)


module.exports = router