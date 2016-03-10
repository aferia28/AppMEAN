//File controller.auth.js

//Controlador con las funciones de registro y login de usuario

var Persona = require('../models/persona.js');
var service = require('../services/service.tokens.js');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('../config');


exports.emailSignup = function(req, res){

	var hashpass = req.body.password;
	console.log("Controller.auth.Signup parte Servidor");
	console.log("Hashpass declarada "+ hashpass);

	Persona.findOne({email: req.body.email.toLowerCase()}, function(err, persona) {
		if (persona) {
			console.log('Error: Este email ya esta en uso...');
		}else{

			if(req.body.password.length < 8)
			{
				console.log('Error: La contraseña debe tener 8 caracteres como mínimo..');
			}
			else{
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(hashpass, salt, function(err, hash) {
				    	if(err)
				    	{
				    		res.status(500).send(err.message);
				    	}
				    	else
				    	{
				    		var persona = new Persona({
								nombre		:req.body.nombre,
								apellidos	:req.body.apellidos,
								email 		:req.body.email,
								password 	:hash,
								isAdmin		: false,
								verified	: false
							});

							console.log('hashpass creado: ' + hash);

							persona.save(function(err, persona){
						    	if(err){
						    		return res.status(500).send(err.message);
						    	}else{
						    		//res.status(200).jsonp(persona); Esta linea esta comentada porque si no la comenta salta un error: Error: Can't set headers after they are sent
						    										  //Según documentación, aparece porque hay dos respuestas seguidas.
						    		res.send({token: service.createToken(persona)});
						    	}
						    });
				    	}
				    });
				});
			}
		}
	})
};

exports.emailLogin = function(req, res){

	console.log("Controller.authLogin parte Servidor");

	Persona.findOne({email: req.body.email.toLowerCase()}, function(err, persona){
		if(!persona){
			console.log('Email incorrecto');
			//return res.status(401).send({message: "Email incorrecto"});
		}else
		if(err){
			return res.status(500).send(err.message);
		}else{

			console.log(persona.password);
			console.log(req.body.password);

			bcrypt.compare(req.body.password, persona.password, function(err, response) {
			    if(response == true)
			    {
			    	if(persona.verified == true)
			    	{
			    		console.log("Back_1. Persona logeada correctamente");

						var token = service.createToken(persona);
						res.send({token: token});

						var tokenPlayload = jwt.decode(token, config.TOKEN_SECRET);
						if (tokenPlayload.adm) {
							console.log('Back_2. El Usuario registrado es administrador.');
							console.log('Back_3. ' + tokenPlayload.adm);

						}else{
							console.log('El Usuario registrado NO es administrador.');
						}
			    	}else{
			    		console.log('EMAIL no verificado');
			    	}
			    }else {
			    	console.log("Contraseña incorrecta para: " + persona.email);
			    }
			});
		}
	});
};
