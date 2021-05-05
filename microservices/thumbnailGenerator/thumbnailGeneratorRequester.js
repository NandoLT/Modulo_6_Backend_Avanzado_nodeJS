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

    requester.send(request, (err, res) => {
        if (err) { 
            console.log('ERROR REQUESTER', err)
            return
        }
        console.log('RESPUESTA REQUESTER', res)
    })
}


module.exports = thumbnailRequester