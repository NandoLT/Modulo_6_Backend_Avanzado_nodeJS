const path = require('path')

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

const apiRoutes = require('./routes/products')
const indexRoutes = require('./routes/index')

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
app.use(bodyParser.urlencoded({extended:false}))

// routes
//---- website - API-----//
app.use('/', indexRoutes)
//---- API -----//
app.use('/api/products', apiRoutes)

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