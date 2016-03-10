
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
	//console.log(token);

	var playload	= jwt.decode(token, config.TOKEN_SECRET);
	//console.log(playload);

	Persona.findById(playload.sub, function(err, persona){
		if(err){
			console.log("Error recuperando a las personas...");
			res.send(err);
		}else{
			res.send(persona);
			console.log("User logged: " + persona.email);
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

	//PUT
exports.updatePersona = function(req, res) {

	console.log(req.body);

	Persona.findById(req.params.id, function(err, persona) {
		persona.nombre = req.body.nombre;
		persona.apellidos = req.body.apellidos;
		persona.email = req.body.email;

		persona.save(function(err) {
			if(err) return err.status(500).send(err.message);
			else {console.log('persona actualizada correctamente');res.status(200).jsonp(persona)}
		});
	});
};

	//DELETE
exports.deleteUser = function(req, res) {

	Persona.remove({_id : req.params.id}, function(err, persona) {

		if(err) console.log('ERROR: ' + err);
		res.json(persona);
	})

}
