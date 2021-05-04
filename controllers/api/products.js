const Products = require('../../models/Products')
const gF =  require('../../utils/getFilter')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,path.join('public/uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

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

    // upload: async (req, res, next) => {
    //     let upload = multer({storage}).single('image')
    //     upload(req, res, function(err){
    //         if (err instanceof multer.MulterError) {
    //             return res.status(400).json({message: err})
    //         } else if (err) {
    //             return res.status(400).json({message: err})
    //         }

    //         const path = `${req.protocol}://${req.get('host')}/${req.file.path.replace('\\', '/')}`
    //         console.log(req.file.path)
    //         console.log('PATH', path)
    //         return res.status(200).json({message: 'image upload'})
    //     })
    // },

    createProduct: async (req, res, next) => {
        let upload = multer({storage}).single('image')
        upload(req, res, async function(err){
            console.log('DATOS DE IMAGEN', req.file)
            if (err instanceof multer.MulterError) {
                return res.status(400).json({message: err})
            } else if (err) {
                return res.status(400).json({message: err})
            }
            const pathThumpbail = `${req.protocol}://${req.get('host')}/${req.file.path.replace('\\', '/').replace('\\', '/')}`
            const pathWeb = `${req.file.path.replace('public', '').replace('\\', '/').replace('\\', '/')}`

            try {
                const newProduct = new Products(req.body)
                newProduct.image = pathWeb
                console.log('NUEVO PRODUCTO',newProduct)

                const product = await newProduct.save()
                res.status(201).json(product)  
            } catch (error) {
                next()
            }
        })
    }
}