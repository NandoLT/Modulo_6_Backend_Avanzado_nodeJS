const express = require('express')
const router = express.Router();
const sessionAuth = require('../libs/sessionAuth')

const { 
    index,
    createProduct,
    deleteProduct,
    tagsList,
    viewUpdateProduct,
    updateProduct, 
    changeLocale
} = require('../controllers/web')


router.get('/',                             sessionAuth, index)
router.post('/',                            createProduct)
router.post('/update_item/:productId',      sessionAuth, updateProduct)
router.get('/tags',                         tagsList)
router.get('/delete/:productId',            deleteProduct)
router.get('/update_item/:productId',       sessionAuth, viewUpdateProduct)
router.get('/change-locale/:language',      changeLocale)


module.exports = router