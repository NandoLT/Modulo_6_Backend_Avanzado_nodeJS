const express = require('express')
const router = express.Router();

const jwtAuth = require('../libs/jwtAuth')

const { 
    index,
    createProduct,
    tagsList, 
} = require('../controllers/api/products')


router.get('/',         jwtAuth,index)
router.post('/',        jwtAuth,createProduct)
router.get('/tags',     jwtAuth,tagsList)

module.exports = router