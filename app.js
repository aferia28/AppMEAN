

//Loading dependencies
var express = require('express');
var path = require('path');

//Iniciamos express
var app = express();


var logger = require('morgan');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




//Routes
var home = require(__dirname + '/app/routes/home');
var users = require(__dirname +'/app/routes/users');

//app.use('/', home); //Cuando estemos en '/', se ejecutara routes, que esta definido mas arriba.
//app.use('/users', users);
app.get('/', function(req, res){
   res.sendfile('./public/views/layouts/main.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Export/inicializar servidor
if(!!module.parent){
  module.exports = app;
}else{
  app.listen(3000);
}


