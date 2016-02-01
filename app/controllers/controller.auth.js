//File controller.auth.js

//Controlador con las funciones de registro y login de usuario

var Persona = require('../models/persona.js');
var service = require('../services/service.tokens.js');

exports.emailSignup = function(req, res){

	console.log("Controller.auth.Signup parte Servidor")

	var persona = new Persona({
		nombre		:req.body.nombre,
		apellidos	:req.body.apellidos,
		email 		:req.body.email,
		contraseña 	:req.body.contrasena,
		r_contraseña:req.body.r_contrasena
	});

	persona.save(function(err, persona){
    	if(err){
    		return res.status(500).send(err.message);
    	}else{
    		//res.status(200).jsonp(persona); Esta linea esta comentada porque si no la comenta salta un error: Error: Can't set headers after they are sent
    										  //Según documentación, aparece porque hay dos respuestas seguidas.
    		res.send({token: service.createToken(persona)});
    	}
    });
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
			if(req.body.contrasena == persona.contraseña){

				//res.status(200).jsonp(persona);

				console.log("Persona logeada correctamente")
				res.send({token: service.createToken(persona)});
			}else{
				console.log("Contraseña incorrecta para: " + persona.email);
			}
			//res.status(200).jsonp(persona);
		}
	});
};