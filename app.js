#!/usr/bin/env node

require('dotenv').config();

const path = require('path')

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

const apiRoutes = require('./routes/products')
const indexRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const cookieParser = require('cookie-parser')

// settings
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// conexión a BD
require('./libs/db-connection')

// middelwares
app.use(logger('dev'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// routes
//---- API -----//
app.use('/api/products', apiRoutes)

// Setup de i18n
const i18n = require('./libs/i18nConfigure')
app.use(i18n.init);
// Gestión de sesiones del website
app.use(session({
    name: 'nodepop-session',
    secret: 'asD)/ASD)={as{ç//zD<*SDFSDf',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV !== 'development', 
        maxAge: 1000 * 60 * 60 * 24 * 2
    }
}))
app.use((req, res , next) => {
    res.locals.session = req.session // hacemos una varialbe global para que guarde la sesión disponible para todas las vistas
    next()
})
//---- website - API-----//
app.use('/', indexRoutes)
app.use('/user-acces', loginRoutes)

// variables globales
app.locals.title = 'Nodepop'
app.locals.currency ='€'

// error handler
app.use(function(err, req, res, next) {
    // es un error de validacion?
    if(err.array){
        const errInfo = err.array({onlyFirstError: true})[0]
        err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`
        err.status = 422
    }
    res.status(err.status || 500);
    if(isAPiRequest(req)) {
        res.json({error: err.message})
        return
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    
    res.render('error');
    });
    function isAPiRequest(req) {
    return req.originalUrl.indexOf('/api/') === 0;
}

app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'))
}) 