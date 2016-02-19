

//Loading dependencies
var express = require('express');
var path = require('path');
var mongoose  = require('mongoose');

//var nodemailer = require("nodemailer");

var app = express();
/*
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "proyectomean@gmail.com",
        pass: "proyectodaw2a"
    }
});

var rand,mailOptions,host,link;

app.get('/send/:email',function(req,res){

    var data = req.params.email;
    console.log('req.body: ' + data);

    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : data,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
	});
});

app.get('/verify',function(req,res){

	console.log(req.protocol+":/"+req.get('host'));
	if((req.protocol+"://"+req.get('host'))==("http://"+host))
	{
	    console.log("Domain is matched. Information is from Authentic email");
	    if(req.query.id==rand)
	    {
	        console.log("email is verified");
          console.log('Email validation : ' + mailOptions.to);

	        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");

          Persona.find('email', mailOptions.to, function(err, persona) {
            if(err){
                res.send(err);
            }
            else{
              persona.verified = true;

              persona.save(function(err) {
              if(err) return err.status(500).send(err.message);
              else {console.log('persona actualizada correctamente');res.status(200).jsonp(persona)}
            });
              console.log('Persona verificada correctamente');
              res.json(persona);
            }
          })
          //complete singup aquí. Persona.verified = true;
	    }
	    else
	    {
	        console.log("email is not verified");
	        res.end("<h1>Bad Request</h1>");
	    }
	}
	else
	{
	    res.end("<h1>Request is from unknown source");
	}
});*/

//Iniciamos express

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
   res.sendFile(__dirname + '/public/views/layouts/index.html');
});


//Export/inicializar servidor
if(!!module.parent){
  module.exports = app;
}else{
  app.listen(8080);
  console.log("Puerto 8080")
}


