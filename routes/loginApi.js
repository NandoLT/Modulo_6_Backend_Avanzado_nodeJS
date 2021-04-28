const express = require('express')
const router = express.Router();

const { 
    login
} = require('../controllers/api/loginApi')

router.post('/', login)


module.exports = router


