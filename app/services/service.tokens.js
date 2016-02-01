//File service.tokens.js

//En este archivo nos encargaremos de crear los Tokens para que un usuario pueda hacer Login
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');


exports.createToken = function(persona){
	/*
	Creamos un objeto payload en el que ponemos tres atributos: sub, iat y exp.
		SUB: Identifica el sujeto del token, por ejemplo un identificador de usuario
		IAT: Identifica la fecha de creación del token, válido para si queremos ponerle una fecha de caducidad. En formato de tiempo UNIX
		EXP: Identifica a la fecha de expiración del token. Podemos calcularla a partir del iat. También en formato de tiempo UNIX.
	*/

	/*
		También usamos la librería moment para ayudarnos en el manejo de fechas.
		Con moment().unix() conseguimos el tiempo actual en formato UNIX, y con moment().add(14, "days").unix()
		le estamos añadiendo 14 días al momento actual. Muy útil para establecer una fecha de creación y expiración.
	*/
	var playload = {
		sub: persona._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	};
	console.log("Persona: " + persona.nombre + "Playload: " + playload.sub + " " + playload.iat + " " + playload.exp);
	//console.log(jwt.encode(playload));
	//Por úlitmo devolvemos el JSON Web Token, codificando el payload con nuestra clave secreta.
	return jwt.encode(playload, config.TOKEN_SECRET);
};
