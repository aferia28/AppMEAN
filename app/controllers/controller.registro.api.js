var fs = require('fs');
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

	console.log('Body', req.body);
	console.log('Body', req.query);
	console.log('Files', req.files);
	var isAdmin = false;

	if(req.body.profile.isAdmin != undefined){
		isAdmin = req.body.profile.isAdmin;
	}

	Persona.findById(req.params.id, function(err, persona) {
		persona.nombre 		= req.body.profile.nombre;
		persona.apellidos 	= req.body.profile.apellidos;
		persona.email 		= req.body.profile.email;
		persona.isAdmin 	= isAdmin;
		if (req.files != undefined) {
			var file = req.files.file;
			persona.image.data = fs.readFileSync(file.path),
			persona.image.contentType = file.type
		}

		persona.save(function(err) {
			if(err) return err.status(500).send(err.message);
			else {console.log('persona actualizada correctamente');res.send(persona)}
		});
	});
};

exports.deleteFavoriteWine = function(req, res) {

	console.log('PUT');
	console.log('Body', req.body);
	var favorite = req.body.code;
	console.log(favorite);
	favorite = favorite.toString();

	Persona.update(
		{_id:req.params.id},
		{$pull:{favoritos: favorite}}, function(err) {
		if(!err)
		{
			console.log('Vino eliminado');
			Persona.findById(req.params.id, function(err, persona) {
				if(!err){
					console.log('Favoritos actualizados');
					res.send(persona);
				}else{
					res.send(err);
				}
			})
		}else{
			res.send(err)
		}
	})
	//DELETE
}
exports.deleteUser = function(req, res) {

	Persona.remove({_id : req.params.id}, function(err, persona) {
		if(err) console.log('ERROR: ' + err);
		res.json(persona);
	})

}

exports.latestLogin = function(req, res) {

	Persona.aggregate(
		[
			{$sort: {lastLogIn: -1}},
			{$limit: 3}
		], function(err, personas) {
		if(!err)
		{
			res.send(personas)
		}else{
			res.send(err)
		}
	})
}

exports.lastSignUp = function(req, res) {

	Persona.aggregate(
		[
			{$sort: {createAt: -1}},
			{$limit: 3}
		], function(err, personas) {
		if(!err)
		{
			res.send(personas)
		}else{
			res.send(err)
		}
	})
}
