//File middleware.js

//Cada vez que accedamos a una ruta privada, sólo accesible si estamos autenticados,
//como por ejemplo /private, le pasamos el middleware ensureAuthenticated

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAdmin = function(req, res, next){

	/*
		Lo primero que hacemos en la función es comprobar que la petición,
		req lleva la cabecera de autorización req.headers.authorization.
		**Ésto lo envía el Frontend y lo veremos en un próximo post, con Angular.js**
	*/
	if(!req.headers.cookie){

		//Si la petición no envía una autorización, envíamos el código de error 403 de acesso denegado.
		return res
			.status(403)
			.send({message: 'Tu peticion no tiene sesion'});
	}

	//si no, tomamos el token.
	//la cabecera, tendrá una pinta parecida a ésta:
		/*
			Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbsciOiJIUzI1NiJ9.eyJzdWIiOiIWeRtU2ZWMyYjUyNjgxNzE2YmXiNzAxMz
			IiLCJpYXQiOjE0Mj10MjA0OTEsImV4cCI6MTQy67YzMDA5MX0.IH7ek7Rp_WQJvXeOd8zrBIpeFi4W6kUi_6htmaxv7Ow
		*/

	//Sólo tenemos que obtener el token de ese String y lo hacemos con el método split de JavaScript:
	var token 		= req.headers.cookie.split('=')[1];

	/*
		Decodificamos ese token con la función decode y la clave secreta y ya podemos identificar al usuario,
		con el atributo sub del objeto payload, que según este ejemplo serán un ObjectID de Mongo.
	*/
	var playload	= jwt.decode(token, config.TOKEN_SECRET);
	console.log(playload);

	var isAdmin = playload.adm;

	if(playload.exp <= moment().unix()){
		return res
			.status(401)
			.send({message: 'El token a expirado'});
	}else if(playload.adm == true){

		req.persona = playload.sub;
		next();
	}else{
		return res.send({message: 'No eres admin'});
	}


}
