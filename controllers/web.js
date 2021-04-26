const Products = require('../models/Products')
// const axios = require('axios')
// const url = 'http://localhost:3000/api/products'
// const urlTags = 'http://localhost:3000/api/products/tags'
const gF =  require('../utils/getFilter')


module.exports = {
    index: async(req, res, next)  => {
        /* const query = req.query
        const response = await axios.request({
            url: url,
            method: 'get',
            params: query
        })
        res.status(200).render('index', {
            productos: response.data
        }) */
        try {
            // filter
            const name = req.query.name
            const tags = req.query.tags
            const price = req.query.price
            const sale = req.query.sale
            const limit =  parseInt(req.query.limit)
            const start = parseInt(req.query.start)
            const fields = req.query.fields
            const sort = req.query.sort
            let filter = {}

            filter = gF.getFilter(filter, name, price, sale, tags)

            const products = await Products.list(filter, limit, start, fields, sort)

            products.length === 0 ? res.status(404).render('404') : res.status(200).render('index', {
                productos: products
            })
        } catch (error) {
            console.log(error)
        }
    },
    createProduct: async(req, res, next)  => {
        /* const query = req.body
        await axios.request({
            url: url,
            method: 'post',
            data: query
        })
        res.status(200).redirect('/') */
        try {
            const newProduct = new Products(req.body)
            console.log('NUEVO PRODUCTO',newProduct)
            const product = await newProduct.save()
            res.status(201).redirect('/')  
        } catch (error) {
            next()
        }
    },
    tagsList: async(req, res, next)  => {
        /* const tags = await axios.request({
            url: urlTags
        })
        res.status(200).render('tags',{
            tags: tags.data
        }) */
        try {
            const tagList = await Products.tagsQuery()
            res.status(200).render('tags', {
                tags: tagList
            })
        } catch (error) {
            next()
        }
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
    }, 

    changeLocale: (req, res, next) => {
        const language = req.params.language
        res.cookie('nodepop-language', language, {maxAge: 100*60*60*24*20})
        res.redirect(req.get('referer'))
    }
}