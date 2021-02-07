const express = require('express')
const router = express.Router();

const { 
    index,
    createProduct,
    tagsList
} = require('../controllers/api/products')


router.get('/', index)
router.post('/', createProduct)
router.get('/tags', tagsList)

module.exports = router