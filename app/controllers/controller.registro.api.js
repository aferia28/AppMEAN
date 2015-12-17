
var Persona = require('../models/persona');

exports.getPersona = function(req, res){ //definicion de las funciones de la API ..
	console.log(req);
	Persona.find(function(err, persona){
		if(err)
		{
			res.send(err);
		}else{
			res.json(persona);
		}
	});
}

exports.setPersona = function(request, res){
	console.log(request.body);
	Persona.create(
		{
			nombre : request.body.nombre,
			apellido : request.body.apellido,
			edad : request.body.edad
		},
			function(err, persona){
				if(err){
					res.send(err);
				}else{
					res.json(persona);
					console.log("persona creada: " + persona);
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

exports.deletePersona = function(request, res){

	Persona.remove(
		{
			_id : request.params.persona_id
		}, function(err, persona){
			if(err)
				res.send(err);

			Persona.find(function(err, persona){
				if(err){
					res.send(err);
				}else{
					res.json(persona);
				}
			});
		});
}
