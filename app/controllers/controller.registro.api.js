
var Persona = require('../models/persona');
var jwt = require('jwt-simple');
var config = require('../config');


exports.getAllProfiles =  function(req, res) {

	Persona.find(function(err, persona) {
		if(!err) res.send(persona);
		else console.log('ERROR: ' + err);
	});
}

//
exports.getPersona = function(req, res){

	//Recupera el token de autenticación y
	//Recupera la persona que hay logeada.

	var token 		= req.headers.authorization.split(' ')[1];
	console.log(token);

	var playload	= jwt.decode(token, config.TOKEN_SECRET);
	console.log(playload);

	Persona.findById(playload.sub, function(err, persona){
		if(err){
			console.log("Error recuperando a las personas...");
			res.send(err);
		}else{
			res.json(persona);
			console.log(persona);
		}
	});
}

exports.getUserProfile = function(req, res) {

	Persona.findById(req.params.userId, function(err, persona) {
		if(err) res.send(err);
		else res.json(persona);
	})
}

exports.setPersona = function(req, res){

	console.log('POST');
    console.log(req.body);

    var persona = new Persona({
		nombre: 		req.body.nombre,
		apellidos: 		req.body.apellidos,
		email: 			req.body.email,
		password: 	req.body.password,
		r_password: 	req.body.r_password,

	});

    persona.save(function(err, persona){
    	if(err){
    		return res.status(500).send(err.message);
    	}else{
    		res.status(200).jsonp(persona);
    	}
    })
}

exports.updatePersona = function(req, res){

	Persona.update(
		{_id : req.params.persona_id},
		{$set:
			{
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				edad: req.body.edad
			}
		}, function(err, persona){
			if(err){
				res.send(err);
			}else{
				res.json(persona);
			}

			Persona.find(function(err, persona){
				if(err){
					res.send(err);
				}else{
					res.json(persona);
				}
			});
		});
}

	//DELETE
exports.deleteUser = function(req, res) {

	Persona.findById(req.params.id, function(err, persona) {
		persona.remove(function(err) {
			if(!err) console.log('Persona borrado!');
			else console.log('ERROR: ' + err);
		});
	});
}
