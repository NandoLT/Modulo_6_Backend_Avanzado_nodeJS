require('../db-connection');
const mongoose = require('mongoose')
const Products = require('../../models/Products')

const fs = require('fs')
const data = fs.readFileSync((__dirname + '/productos.json'), 'utf8')
const dataParse = JSON.parse(data)

async function  dropChargeBd(){
    if(Products){
        try {
            await Products.deleteMany({})
            console.log('Collection deleted')
            await Products.insertMany(dataParse)
            console.log("Data inserted")
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            await Products.insertMany(dataParse)
            console.log("Data inserted")
        } catch(err) {
            console.log(err)
        }
    }
}

dropChargeBd()