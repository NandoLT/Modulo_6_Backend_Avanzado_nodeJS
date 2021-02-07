const Products = require('../../models/Products')
const gF =  require('../../utils/getFilter')

module.exports = {
    index: async (req, res, next) => {
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
            products.length === 0 ? res.status(404).json({result: "Empty  result"}) : res.status(200).json(products)
        } catch (error) {
            next()
        }
    },
    tagsList: async ( req, res, next) => {
        try {
            const tagList = await Products.tagsQuery()
            res.status(200).json(tagList) 
        } catch (error) {
            next()
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const newProduct = new Products(req.body)
            console.log('NUEVO PRODUCTO',newProduct)
            const product = await newProduct.save()
            res.status(201).json(product)  
        } catch (error) {
            next()
        }
    }
}