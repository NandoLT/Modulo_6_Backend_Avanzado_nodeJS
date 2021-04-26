const express = require('express')
const router = express.Router();


console.log('Se rompe en rutas')
const { 
    index,
    loginPost, 
    createUser
} = require('../controllers/login')


router.get('/', index)
router.post('/', loginPost)
router.post('/create-user', createUser)


module.exports = router