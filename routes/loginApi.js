const express = require('express')
const router = express.Router();

const { 
    index,
    login
} = require('../controllers/api/loginApi')

router.get('/', index)
router.post('/', login)


module.exports = router


