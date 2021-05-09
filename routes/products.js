const express = require('express')
const router = express.Router();

const jwtAuth = require('../libs/jwtAuth')

const { 
    index,
    createProduct,
    tagsList,
    thumbnailsList, 
} = require('../controllers/api/products')


router.get('/',             jwtAuth,index)
router.post('/',            jwtAuth,createProduct)
router.get('/tags',         jwtAuth,tagsList)
router.get('/thumbnails',   jwtAuth, thumbnailsList)

module.exports = router