const express = require('express')
const router = express.Router();

const jwtAuth = require('../libs/jwtAuth')

const { 
    index,
    createProduct,
    tagsList, 
    // upload
} = require('../controllers/api/products')


router.get('/',         jwtAuth,index)
router.post('/',        jwtAuth,createProduct)
// router.post('/upload',  upload)
router.get('/tags',     jwtAuth,tagsList)

module.exports = router