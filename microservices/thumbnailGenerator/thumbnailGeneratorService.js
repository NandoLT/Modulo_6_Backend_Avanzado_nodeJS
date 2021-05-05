'use strict'

const cote = require('cote')

const responder = new cote.Responder({
    name: 'Thumbnail Generator'
})

console.log('REQUEST en microservicio antes del .on')

responder.on('process thumbnail', (req, done) => {

    console.log('REQUEST en microservicio')
    const {imagePath} = req

    console.log('Esta es mi imagen para procesar', imagePath)


    const result = imagePath

    done(result)
})