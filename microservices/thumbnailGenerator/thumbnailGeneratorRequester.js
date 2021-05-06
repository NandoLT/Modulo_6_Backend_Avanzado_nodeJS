'use strict'

const cote = require('cote')

const requester = new cote.Requester({
    name: 'Thumbnail Generator Requester'
})


const thumbnailRequester = (imagePath) => {
    console.log('Entramos en el REQUESTER')

    const request = {
        type: 'process thumbnail',
        imagePath: imagePath
    }
    console.log('Request configuration', request)

    requester.send(request, respond => {
        console.log('RESPUESTA', respond)
    })
}


module.exports = thumbnailRequester