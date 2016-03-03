var auth    	= require('./controller.auth');
var Persona 	= require('../models/persona');
var nodemailer 	= require("nodemailer");

var rand,mailOptions,host,link;

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "proyectomean@gmail.com",
        pass: "proyectodaw2a"
    }
});

exports.sendEmail = function(req, res) {

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
}

exports.verifiedEmail = function(req, res) {
	console.log(req.protocol+":/"+req.get('host'));
	if((req.protocol+"://"+req.get('host'))==("http://"+host))
	{
	    console.log("Domain is matched. Information is from Authentic email");
	    if(req.query.id==rand)
	    {
	        console.log("email is verified");
          	console.log('Email validation : ' + mailOptions.to);

          	Persona.findOne({'email': mailOptions.to}, function(err, persona) {

          		persona.verified = true;

	            persona.save(function(err) {
	    			if(err) return err.status(500).send(err.message);
	    			else {console.log('persona actualizada correctamente');res.status(200)/*.jsonp(persona)*/}
        		});

        		console.log('Persona verificada correctamente');
        		res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        		//res.json(persona);
          })
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
}
