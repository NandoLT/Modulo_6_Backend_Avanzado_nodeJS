const Products = require('../../models/Products')
const fs = require('fs')
// import { readdir } from 'fs/promises';
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
const thumbnailRequester = require('../../microservices/thumbnailGenerator/thumbnailGeneratorRequester')

// TODO:  llevar a Utils multer para poder ajecutarse en todos los lugares que fuera necesario sin replicar tanto código
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
        let upload = multer({storage}).single('image')
        upload(req, res, async function(err){
            if (err instanceof multer.MulterError) {
                return res.status(400).json({message: err})
            } else if (err) {
                return res.status(400).json({message: err})
            }
            console.log('REQ CON INFO FILE',req.file)
            const pathThumpnail = req.file.originalname
            const pathWeb = `${req.file.path.replace('public', '').replace('\\', '/').replace('\\', '/')}`

            await thumbnailRequester(pathThumpnail)
        
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
    }, 

    thumbnailsList: async (req, res, next) => {
        const directory = path.join('public/uploads/thumbnails')
        let filesPath = []

        fs.readdir(directory, async (err, files) =>{
            if(err) {
                console.error(err)
            }
            for(const image of files) {
                console.log(image[0])
                filesPath.push(`/${directory.replace('public', '')}/${image}`)
            }
            res.send({
                status: 'ok',
                filess:filesPath
            })
        })
    }
}