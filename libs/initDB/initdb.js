require('../db-connection');
const mongoose = require('mongoose')
const Products = require('../../models/Products')
const Users = require('../../models/Users')
const fs = require('fs');

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

async function encryptUSerPasswords(dataUsers){
    let users = []
    Promise.all(dataUsers.map(async user => {
        const userObj = {
            email: user.email,
            password: await Users.hashPassword(user.password)
        }
        users.push(userObj)
        console.log(users)
    }))
    return users
}

async function  dropChargeBd(dataProducts, dataUsers){
    
    const usersEncrypt = await encryptUSerPasswords(dataUsers)
    //TODO No consigo corregir el desfase temporarl en la ejecución. Por eso utilizo un setTimeout
    setTimeout(async () => {
        try {
            //Products
            await Products.deleteMany({})
            console.log('Collection Products deleted')
            await Products.insertMany(dataProducts)
            console.log(`Data Products inserted: ${dataProducts.length}`)
            //Users
            await Users.deleteMany({})
            console.log('Collection Users deleted')
            // await Users.insertMany(dataUsers)
            await Users.insertMany(usersEncrypt)

            console.log(`Data Users inserted: ${dataUsers.length}`)
            
            console.log("Closing DB Conecction...")
            mongoose.connection.close()
        } catch (err) {
            console.log(err)
        }
    }, 1000)
        

}

init({dataProducts:(__dirname + '\\productos.json'),dataUsers:(__dirname + '\\users.json')})