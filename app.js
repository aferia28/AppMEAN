

//Loading dependencies
var express = require('express');
var path = require('path');
var mongoose  = require('mongoose');

//Iniciamos express
var app = express();
mongoose.connect('mongodb://localhost:27017/DBpersonas', function(error){
	if(error){
		throw error;
		console.log(error);
	}else{
		console.log('Conectado a MongoDB. BD MeanExample');
	}
});

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
require('./app/routes/route.registro.api.js')(app);

app.get('/', function(req, res){
   //res.sendFile('./public/views/layouts/main.html');
   res.sendFile(__dirname + '/public/views/layouts/main.html');
});


//Export/inicializar servidor
if(!!module.parent){
  module.exports = app;
}else{
  app.listen(8080);
  console.log("Puerto 8080")
}


