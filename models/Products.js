'use strict'
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    image: String,
    tags: Array
})

productSchema.statics.list = function(filter, limit, start, fields, sort) {
    const query = Products.find(filter);
    query.limit(limit)
    query.skip(start)
    query.select(fields)
    query.sort(sort)
    return query.exec();
    
}
productSchema.statics.tagsQuery = function(){
    const query = Products.find()
    query.distinct('tags')
    return query.exec()
}
const Products = mongoose.model('Products', productSchema)

module.exports = Products