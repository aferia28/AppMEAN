var Vino = require('../models/wine.js');
var Puntuacion = require('../models/puntuacion.js');
var http = require('http');
	//GET
exports.findAllWines =  function(req, res) {

	Vino.find(function(err, vinos) {
		if(!err) res.send(vinos);
		else console.log('ERROR: ' + err);
	});
}

exports.findWine = function(req, res) {

	var codeWine = req.query.codeWine;
	var usuario	 = req.query.usuario;
	var puntuacionTotal;
	var puntuacionApi;
	var puntuacionPropia;
	var apiWine;
	var canrate;

	var xuser = JSON.parse(usuario);
	console.log('>>>>>>>>>>>>>>>>>' + xuser._id);

	var options = {
		host: 'api.snooth.com',
		path: '/wine/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&id='+codeWine
	};

	callback = function(response) {
  		var string = '';
  		response.on('data', function (chunk) {
    		string += chunk;
    		console.log('RESPONSE ON DATA');
  		});

  		response.on('end', function () {

    		var x = JSON.parse(string);
    		apiWine = x.wines[0];

    		puntuacionApi = apiWine.snoothrank;

    		Vino.find({code: codeWine}, function(err, vino) {
    			if(err){
    				console.log(err);
    			}else{
    				if(vino == '')
    				{
    					//en la colección vino -> puntuacion (que es una array de colección puntuación) buscar la colección que tiene como usuario (que es un campo) el usuario logeado.
    					//si esta el usuario, quiere decir que ha puntuado ese vino concreto. En este caso no se permite puntuar.
    					//ademas, habrá que recoger todas las puntuacion de la colección vino - > puntuaciones y hacer la media, para despues hacer otra media con snoothrank
    					//Estas dos cosas se pueden hacer por separado.
    					puntuacionTotal = puntuacionApi;
    					res.send(apiWine);
    				}else{

    					Vino.find({code: apiWine.code}).populate({path: 'rates', match: { usuario: {$eq:xuser._id}}}).exec(function(err, puntuacion) {

    						console.log('PUNTUACION >>>>>>>>>>' + puntuacion);

    						if(puntuacion[0].rates != '')
    						{
    							if(puntuacion[0].rates[0].usuario == xuser._id)
	    						{
	    							console.log('ESTE USUARIO YA HA PUNTUADO ESTE VINO');
	    							//No puede puntuar
	    							canrate = false;
	    						}else{
	    							console.log('ESTE USUARIO TODAVÍA NO HA PUNTUADO ESTE VINO');
	    							//Puede puntuar
	    							canrate = true
	    						}
    						}
    					});

    					Vino.find({code: apiWine.code}).populate({path: 'rates'}).exec(function(err, puntuaciones) {

    						var c=0;

	    					for(var i = 0; i<puntuaciones[0].rates.length; i++)
	    					{
	    						c = c + puntuaciones[0].rates[i].puntuacion;
	    					}

	    					puntuacionPropia = c / puntuaciones[0].rates.length;

	    					console.log('Puntuacion media nuesttra: ' + puntuacionPropia);
	    					console.log('Puntuacion media api: ' + puntuacionApi);

							puntuacionTotal = (puntuacionPropia + puntuacionApi) / 2;

							console.log(puntuacionTotal);

							var objectToSend = {
								code: apiWine.code,
				    			name: apiWine.name,
				    			price: apiWine.price,
				    			type: apiWine.type,
				    			region: apiWine.region,
				    			winery: apiWine.winery,
				    			varietal: apiWine.varietal,
				    			vintage: apiWine.vintage,
				    			alcohol: apiWine.alcohol,
				    			image: apiWine.image,
				    			reviews: apiWine.reviews,
				    			wm_notes: apiWine.wm_notes,
				    			snoothrank: puntuacionTotal,
				    			canrate: canrate
				    		}
				    		res.send(objectToSend);
    					});
    				}
    			}
    		})
  		});
	}

	http.request(options, callback).end();
}

	//GET
exports.findWineById = function(req, res) {

	Vino.findById(req.params.id, function(err, vino) {
		if(!err) res.send(vino);
		else console.log("ERROR: " + err.message);
	});
}

exports.findWineByCode = function(req, res) {

	var userRank = req.query.rank;
	var wine = req.query.wine;
	var usuario = req.query.usuario;
	var type;

	var x = JSON.parse(wine);
	var y = JSON.parse(usuario);

	console.log('Codigo del vino: ' + x.code);

    Vino.find({code: x.code}, function(err, vino) {
    	if(!err)
    	{
    		if(vino == '')
    		{
    			if(x.type == 'Red Wine')
				{
					type = 'Tinto';
				}else if(x.type == 'White Wine')
				{
					type = 'Blanco';
				}else if(x.type == 'Rose Wine')
				{
					type = 'Rosado';
				}

				var puntuacion = new Puntuacion({
					usuario: y,//usuario que hay logeado en ese momento,
					usuName: y.nombre,
					vineName: x.name,
					puntuacion: userRank
				})

				puntuacion.save(function(err) {
					if(!err) console.log('Puntuacion guardada');
					else console.log('ERROR: ' + err.message);
				})

    			var wine = new Vino({
    				code: x.code,
					name: x.name,
					type: type,
					winery: x.winery,
					grape_type: x.varietal,
					year: x.vintage,
					alcohol: x.alcohol,
					rates:[puntuacion]
    			})

    			wine.save(function(err) {
					if(!err) console.log('Vino guardado!');
					else console.log('ERROR: ' + err.message);
				});

    			//crear rating
    			res.send(wine);
    			//el vino no existe.post
    		}else{

    			var puntuacion = new Puntuacion({
					usuario: y,//usuario que hay logeado en ese momento,
					usuName: y.nombre,
					vineName: x.name,
					puntuacion: userRank
				})

				puntuacion.save(function(err) {
					if(!err) console.log('Puntuacion guardada');
					else console.log('ERROR: ' + err.message);
				})

    			vino[0].rates.push(puntuacion);
    			vino[0].save(function(err) {
					if(err) {
						console.log(err);
					}else{
						console.log('Puntuacion actualizada');
				 		res.send(vino[0])
					}
	    		})
    		}
    	}else{
    		console.log('ERROR: ' + err);
    	}
    })
}

	//POST
exports.addWine = function(req, res) {

	console.log("POST");
	console.log(req.body);

	var wine = new Vino({
		code: req.body.code,
		name: req.body.name,
		type: req.body.type,
		winery: req.body.winery,
		grape_type: req.body.grape_type,
		year: req.body.year,
		alcohol: req.body.alcohol,
		rank: req.body.rank
	});

	wine.save(function(err) {
		if(!err) console.log('Vino guardado!');
		else console.log('ERROR: ' + err.message);
	});

	res.send(wine);
}

	//PUT
exports.updateWine = function(req, res) {

	Vino.findById(req.params.id, function(err, vino) {
		vino.name 		= req.body.name;
		vino.type 		= req.body.type;
		vino.winery 	= req.body.winery;
		vino.grape_type = req.body.grape_type;
		vino.year 		= req.body.year;
		vino.alcohol 	= req.body.alcohol;

		vino.save(function(err) {
			if(!err) console.log('Vino actualizado');
			else console.log('ERROR: ' + err);
		});

	});

}

	//DELETE
exports.deleteWine = function(req, res) {

	Vino.findById(req.params.id, function(err, vino) {
		vino.remove(function(err) {
			if(!err) console.log('Vino borrado!');
			else console.log('ERROR: ' + err);
		});
	});
}
