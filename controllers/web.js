const Products = require('../models/Products')
const axios = require('axios')
const url = 'http://localhost:3000/api/products'
const urlTags = 'http://localhost:3000/api/products/tags'

module.exports = {
    index: async(req, res, next)  => {
        const query = req.query
        const response = await axios.request({
            url: url,
            method: 'get',
            params: query
        })
        res.status(200).render('index', {
            productos: response.data
        })
    },
    createProduct: async(req, res, next)  => {
        const query = req.body
        await axios.request({
            url: url,
            method: 'post',
            data: query
        })
        res.status(200).redirect('/')
    },
    tagsList: async(req, res, next)  => {
        const tags = await axios.request({
            url: urlTags
        })
        res.status(200).render('tags',{
            tags: tags.data
        })
    },
    deleteProduct: async (req, res, next) => {
        const id = req.params.productId
        await Products.findByIdAndDelete(id)
        res.status(200).redirect('/')
    },

    viewUpdateProduct: async (req, res, next) => {
        const id = req.params.productId
        const productToUpdate = await Products.findById(id)
        res.status(200).render('update_item', {
            producto: productToUpdate,
            counterClass: 1
        })
    },
    
    updateProduct: async (req, res, next) => {
        const id = req.params.productId
        const updatedProduct = req.body
        await Products.findByIdAndUpdate(id, updatedProduct)
        res.status(201).redirect('/')
    }
}