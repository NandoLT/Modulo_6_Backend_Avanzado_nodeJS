require('../db-connection');
const mongoose = require('mongoose')
const Products = require('../../models/Products')
const Users = require('../../models/Users')
const fs = require('fs');
const { Console } = require('console');

// const { init } = require('../../models/Products');

async function init({dataProducts, dataUsers}) {
    const responseProducts = await initProducts(dataProducts)
    const responseUsers = await initUsers(dataUsers)
    dropChargeBd(responseProducts, responseUsers)
}

async function initProducts(dataProducts){
    const producstData = await parseData(dataProducts)
    return producstData
}

async function initUsers(dataUsers){
    const usersData = await parseData(dataUsers)
    return usersData
}

async function parseData(dataToParse){
    const data = fs.readFileSync(dataToParse, 'utf8')
    const dataParse = JSON.parse(data)
    return dataParse
}

async function  dropChargeBd(dataProducts, dataUsers){
    if(Products){
        try {
            //Products
            await Products.deleteMany({})
            console.log('Collection Products deleted')
            await Products.insertMany(dataProducts)
            console.log("Data Products inserted")
            //Users
            await Users.deleteMany({})
            console.log('Collection Users deleted')
            await Users.insertMany(dataUsers)
            console.log("Data Users inserted")
            
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            //Products
            await Products.insertMany(dataProducts)
            console.log("Data Products inserted")
            //Users
            await Users.insertMany(dataUsers)
            console.log("Data Users inserted")
        } catch(err) {
            console.log(err)
        }
    }
}

init({dataProducts:(__dirname + '\\productos.json'),dataUsers:(__dirname + '\\users.json')})