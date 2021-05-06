'use strict'

const cote = require('cote')
const jimp = require('jimp')
const path = require('path')
const imagePath = path.join( __dirname + '../../../' + '/public/uploads/')
const thumbnailPath = path.join( __dirname + '../../../' + '/public/uploads/thumbnails/')

const responder = new cote.Responder({
    name: 'Thumbnail Generator'
})


responder.on('process thumbnail', async (req, done) => {

    console.log('REQUEST en microservicio')
    const {imageName} = req

    // Procesamos con jimp
    try {
        const image =  await jimp.read(`${imagePath}/${imageName}`)
        // console.log('IMAGE', image)
        // await image.contain(100, 100)
        // await image.writeAsync(`${imagePath}/${image.name}_thumbnail${image.getExtension()}`)
        // console.log(`${imagePath}thumbnail_${imageName}`) 
        await image.contain(100, 100)
        // console.log('IMAGE CONTAIN', image)
        await image.write(`${thumbnailPath}thumbnail_${imageName}`)
    } catch (error) {
        console.log('ERROR JIMP', error)
    }
    // fin proceso jimp

    const result = 'respuesta válida'
    await done(result)
})