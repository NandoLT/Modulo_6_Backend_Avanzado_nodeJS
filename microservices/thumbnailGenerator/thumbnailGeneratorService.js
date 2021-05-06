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

    console.log('Thumbnail generation in progress...')
    const {imageName} = req

    // Procesamos con jimp
    try {
        const image =  await jimp.read(`${imagePath}/${imageName}`)
        await image.contain(100, 100)
        await image.background(0xFFFFFFFF)
        await image.write(`${thumbnailPath}thumbnail_${imageName}`)
    } catch (error) {
        console.log('ERROR JIMP', error)
    }
    // fin proceso jimp

    const result = 'Thumbnail Generated'
    await done(result)
})