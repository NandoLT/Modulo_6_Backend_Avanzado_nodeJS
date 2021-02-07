
exports.getFilter = function (filter, name, price, sale, tags){
    name ? filter.name = new RegExp('^' + name, 'i') : filter
    tags ? filter.tags = {$in:tags} : filter
    filter = getPrices(filter, price)
    sale ? filter.sale = sale : filter
    return filter
}

function getPrices(filter, price) {
    if(price) {
        let maxPrice 
        let minPrice
        if(price.includes('-')){
            const position = price.indexOf('-')
            if(position == 0) { 
                maxPrice = (price.slice(position + 1))
                filter.price = {$lte:maxPrice}
            } else {
                minPrice = (price.slice(0, position))
                maxPrice = (price.slice(position + 1))
                filter.price = { $gte: minPrice, $lte: maxPrice }
            }
        } else {
            minPrice = price
            filter.price = {$gte:minPrice}
        }
    }
    return filter
}