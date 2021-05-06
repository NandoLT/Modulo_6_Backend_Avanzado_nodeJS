'use strict'

const cote = require('cote')

const requester = new cote.Requester({
    name: 'Thumbnail Generator Requester'
})


const thumbnailRequester = (imageName) => {
    console.log('Entramos en el REQUESTER')

    const request = {
        type: 'process thumbnail',
        imageName: imageName
    }

    requester.send(request, (done) => {
        console.log('RESPOND', done)
    })
}


module.exports = thumbnailRequester