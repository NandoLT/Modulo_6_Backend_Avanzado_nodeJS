const express = require('express')
const router = express.Router();

const { 
    index,
    createProduct,
    deleteProduct,
    tagsList,
    viewUpdateProduct,
    updateProduct, 
    userAcces,
    changeLocale
} = require('../controllers/web')


router.get('/', index)
router.post('/', createProduct)
router.post('/update_item/:productId', updateProduct)
router.get('/tags', tagsList)
router.get('/user-acces', userAcces)
router.get('/delete/:productId', deleteProduct)
router.get('/update_item/:productId', viewUpdateProduct)
router.get('/change-locale/:language', changeLocale)


module.exports = router