var Vino  		= require('../models/wine.js');
var Usuario 	= require('../models/persona.js');
var Puntuacion 	= require('../models/puntuacion.js');
var Comentario 	= require('../models/comentario.js');
var http 		= require('http');
var fs 			= require('fs');

	//GET
exports.findAllWines =  function(req, res) {

	var host 				= 'api.snooth.com';
	var typeSearch 			= '/wines/';
	var apiKey 				= 'mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17';
	var productType 		= 'wine';
	var numberResults 		= 30;
	// var availableWines	= 0; // 0 = all | 1 = in stock
	var sort 				= 'qpr';
	var region 				= 'Catalunya'; // && Cataluña && Catalonia

	var type  				= req.query.type;
	var vintage 			= req.query.vintage;
	var designationOrigin  	= req.query.do;


	var ownType;
	var snoothWines;
	var ownWines;

	if (type == 'red') {
		ownType = 'Negre'
	} else if (type == 'white') {
		ownType = 'Blanc'
	} else if (type == 'rose') {
		ownType = 'Rosat'
	}

	if ( (designationOrigin == '' || designationOrigin == undefined || designationOrigin == null) && (vintage == '' || vintage == undefined || vintage == null) )
	{
		var options = {
			host: host,
			path: typeSearch + '?akey=' + apiKey + '&color=' + type + '&n=' + numberResults + /*'&a=' + availableWines +*/ '&s=' + sort + '&q=' + region
		};
	} else if (designationOrigin == '' || designationOrigin == undefined || designationOrigin == null) {
		var options = {
			host: host,
			path: typeSearch + '?akey=' + apiKey + '&color=' + type + '&n=' + numberResults + /*'&a=' + availableWines +*/ '&s=' + sort + '&q=' + region + '+' + vintage
		};
	} else if (vintage == '' || vintage == undefined || vintage == null) {
		var options = {
			host: host,
			path: typeSearch + '?akey=' + apiKey + '&color=' + type + '&n=' + numberResults + /*'&a=' + availableWines +*/ '&s=' + sort + '&q=' + region + '+' + designationOrigin
		};
	} else { // DO + vintage == defined
		var options = {
			host: host,
			path: typeSearch + '?akey=' + apiKey + '&color=' + type + '&n=' + numberResults + /*'&a=' + availableWines +*/ '&s=' + sort + '&q=' + region + '+' + designationOrigin + '+' + vintage
		};
	}

	console.log(options);

	callback = function(response) {
  		var string = '';
  		response.on('data', function (chunk) {
    		string += chunk;
  		});

  		response.on('end', function () {
  			snoothWines = JSON.parse(string);

			if ( (designationOrigin == '' || designationOrigin == undefined || designationOrigin == null) && (vintage == '' || vintage == undefined || vintage == null) )
			{
				Vino.find({$and:[
					{type: ownType}
				]}, function (err, vinos) {
					if (!err)
					{
						if (vinos == null || vinos == undefined || vinos == '')
						{
							console.log('No hay vinos de este tipo/color en nuestra propia BDD... [DO + vintage == undefinded/null]');
							res.send(snoothWines.wines);
						} else {
							console.log('Buscando vinos sin DO ni vintage definidos en nuestra propia BDD...');
							ownWines = vinos;
							var twoArrays = ownWines.concat(snoothWines.wines);

							console.log(twoArrays);
							for (var i = 0; i < twoArrays.length; i++)
							{
								for (var j = i + 1; j < twoArrays.length; j++)
								{
									if (twoArrays[j] == undefined)
									{
										return res.send(twoArrays); // If it's not returned, the error message 'Can\'t set headers after they are sent.' appears
									} else if (twoArrays[i].code === twoArrays[j].code) {
										twoArrays.splice(j--, 1); // Remove the duplicate wine
									}
								}
							}
							res.send(twoArrays);
						}
					} else {
						res.send(err);
						console.log('ERROR: ' + err.message);
					}
				})
			} else if (designationOrigin == '' || designationOrigin == undefined || designationOrigin == null) {
				Vino.find({$and:[
						{type: ownType},
						{year: vintage}
					]}, function(err, vinos) {
						if (!err)
						{
							if (vinos == null || vinos == undefined || vinos == '')
							{
								console.log('No hay vinos de este tipo/color en nuestra BDD... [DO]');
								res.send(snoothWines.wines);
							} else {
								console.log('Buscando vinos del ' + vintage + ' en nuestra propia BDD...');
								ownWines = vinos;
								var twoArrays = ownWines.concat(snoothWines.wines);

								console.log(twoArrays);
								for (var i = 0; i < twoArrays.length; i++)
								{
									for (var j = i + 1; j < twoArrays.length; j++)
									{
										if (twoArrays[j] == undefined)
										{
											return res.send(twoArrays); // If it's not returned, the error message 'Can\'t set headers after they are sent.' appears
										} else if (twoArrays[i].code === twoArrays[j].code) {
											twoArrays.splice(j--, 1); // Remove the duplicate wine
										}
									}
								}
								res.send(twoArrays);
							}
						} else {
							res.send(err);
							console.log('ERROR: '+ err.message);
						}
				})
			} else if (vintage == '' || vintage == undefined || vintage == null)
			{
				Vino.find({$and: [
						{type: ownType},
						{region: {$in: [designationOrigin]}}
					]}, function(err, vinos) {
						if (!err)
						{
							if (vinos == null || vinos == undefined || vinos == '')
							{
								console.log('No hay vinos de este tipo/color en nuestra BDD... [vintage]');
								res.send(snoothWines.wines);
							} else {
								console.log('Buscando vinos de ' + designationOrigin + ' en nuestra BDD...');
								ownWines = vinos;
								var twoArrays = ownWines.concat(snoothWines.wines);

								console.log(twoArrays);
								for (var i = 0; i < twoArrays.length; i++)
								{
									for (var j = i + 1; j < twoArrays.length; j++)
									{
										if (twoArrays[j] == undefined)
										{
											return res.send(twoArrays); // If it's not returned, the error message 'Can\'t set headers after they are sent.' appears
										} else if (twoArrays[i].code === twoArrays[j].code)
										{
											twoArrays.splice(j--, 1); // Remove the duplicate wine
										}
									}
								}
								res.send(twoArrays);
							}
						} else {
							res.send(err);
							console.log('ERROR: ' + err.message);
						}
					})
			} else
			{
				// DO + vintage == defined
				Vino.find({$and: [
						{type: ownType},
						{region: {$in: designationOrigin}},
						{vintage: vintage}
					]}, function(err, vinos) {
					if (!err)
					{
						if (vinos == null || vinos == undefined || vinos == "")
						{
							console.log('No hay vinos de este tipo/color en nuestra BDD... [DO + vintage == defined]');
							res.send(snoothWines.wines);
						} else {
							ownWines = vinos;
							var twoArrays = ownWines.concat(snoothWines.wines);

							console.log(twoArrays);
							for (var i = 0; i < twoArrays.length; i++)
							{
								for (var j = i + 1; j < twoArrays.length; j++)
								{
									if (twoArrays[j] == undefined)
									{
										return res.send(twoArrays); // If it's not returned, the error message 'Can\'t set headers after they are sent.' appears
									} else if (twoArrays[i].code === twoArrays[j].code)
									{
										twoArrays.splice(j--, 1); // Remove the duplicate wine
									}
								}
							}
							res.send(twoArrays);
						}
					} else {
						res.send(err);
						console.log('ERROR: ' + err.message);
					}
				})
			}
  		})

  	}

	http.request(options, callback).end();
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
	console.log('User logged: ' + 'Id: ' + xuser._id + " | " + "Name: " + xuser.nombre);

	var options = {
		host: 'api.snooth.com',
		path: '/wine/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&id='+codeWine
	};

	callback = function(response) {
  		var string = '';
  		response.on('data', function (chunk) {
    		string += chunk;
  		});

  		response.on('end', function () {

    		var x = JSON.parse(string);
    		apiWine = x.wines[0];

    		puntuacionApi = apiWine.snoothrank;

    		Vino.find({code: codeWine}, function(err, vino) {
    			if(err){
    				console.log(err.message);
    			}else{
    				if(vino == '')
    				{
    					if (puntuacionApi == 'n/a'){
    						puntuacionApi = 0;
    						res.send(apiWine);
    					}else{
    						puntuacionTotal = puntuacionApi;
    						res.send(apiWine);
    					}
    				}else{

    					Vino.find({code: apiWine.code}).populate({path: 'rates', match: { usuario: {$eq:xuser._id}}}).exec(function(err, puntuacion) {

    						if(puntuacion[0].rates != '')
    						{
    							if(puntuacion[0].rates[0].usuario == xuser._id)
	    						{
	    							console.log('ESTE USUARIO YA HA PUNTUADO ESTE VINO');
	    							canrate = false;
	    						}else{
	    							console.log('ESTE USUARIO TODAVÍA NO HA PUNTUADO ESTE VINO');
	    							canrate = true
	    						}
    						}
    					});

    					Vino.findOne({code: apiWine.code}).populate({path: 'rates'}).populate({path: 'comentarios'}).exec(function(err, puntuaciones) {

    						var c=0;

	    					for(var i = 0; i<puntuaciones.rates.length; i++)
	    					{
	    						c = c + puntuaciones.rates[i].puntuacion;
	    					}
	    					puntuacionPropia = c / puntuaciones.rates.length;
	    					if(puntuacionApi == "n/a")
	    					{
	    						puntuacionApi = 0;
	    					}
	    					console.log('Puntuacion media nuesttra: ' + puntuacionPropia);
	    					console.log('Puntuacion media api: ' + puntuacionApi);

							puntuacionTotal = (puntuacionPropia + puntuacionApi) / 2;

							console.log(puntuacionTotal);

							var objectToSend = {
								code 		: apiWine.code,
				    			name 		: apiWine.name,
				    			price 		: apiWine.price,
				    			type 		: apiWine.type,
				    			region 		: apiWine.region,
				    			winery 		: apiWine.winery,
				    			varietal	: apiWine.varietal,
				    			vintage 	: apiWine.vintage,
				    			alcohol		: apiWine.alcohol,
				    			image_url	: apiWine.image,
				    			reviews 	: apiWine.reviews,
				    			wm_notes 	: apiWine.wm_notes,
				    			snoothrank 	: puntuacionTotal,
				    			comentarios : puntuaciones.comentarios, //aqui las puntuaciones en realidad es un vino
				    			canrate 	: canrate
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

exports.addComment = function(req, res) {

	var comment = req.query.comentario;
	var wine  	= req.query.wine;
	var usuario = req.query.usuario;

	var wi  	= JSON.parse(wine);
	var usu  	= JSON.parse(usuario);

	Vino.findOne({code: wi.code}).populate({path: 'comentarios'}).exec(function(err, vino) {
		if(!err)
		{
			console.log(vino)
			if(vino === null)
			{
				if(wi.type == 'Red Wine' || wi.color == 'Red')
				{
					type = 'Negre';
				}else if(wi.type == 'White Wine' || wi.color == 'White')
				{
					type = 'Blanc';
				}else if(wi.type == 'Rose Wine' || wi.color == 'Rose')
				{
					type = 'Rosat';
				}
				var comentario = new Comentario({
					usuario: usu,
					texto: comment,
					time: Date.now()
				})

				comentario.save(function(err) {
					if(!err) console.log('Comentario guardado');
					else console.log('ERROR: ' + err.message);
				})
				var wine = new Vino({
    				code 	 		: wi.code,
					name 			: wi.name,
					price 			: wi.price,
					type 			: type,
					region 			: wi.region,
					winery 			: wi.winery,
					varietal 		: wi.varietal,
					vintage 		: wi.vintage,
					alcohol 		: wi.alcohol,
					image_url 		: wi.image,
					reviews 		: wi.reviews,
					wm_notes 		: wi.wm_notes,
					snoothrank 		: wi.snoothrank,
					comentarios 	:[comentario]
    			})

    			wine.save(function(err) {
					if(!err) console.log('Vino guardado!');
					else console.log('ERROR: ' + err.message);
				});

				res.send(wine);
			}else{

				console.log(vino);
				var comentario = new Comentario({
					usuario: usu,
					texto: comment,
					time: Date.now()
				})

				comentario.save(function(err) {
					if(!err) console.log('Comentario guardado');
					else console.log('ERROR: ' + err.message);
				})

    			vino.comentarios.push(comentario);
    			vino.save(function(err) {
					if(err) {
						console.log(err);
					}else{
						console.log('Comentario actualizado');
				 		res.send(vino)
					}
	    		})
			}
		}else{
			console.log('ERROR: ' + err);
		}
	})
}

exports.addFavorite = function(req, res) {

	var code_wine 	= req.query.codeWine;

	var usuario 	= req.query.usuario;
	var usu  		= JSON.parse(usuario);

	Usuario.findOne({_id: usu._id, favoritos: code_wine}, function(err, user){
		if(!err)
		{
			if(user == null)
			{
				Usuario.findOne({_id: usu._id}, function(err, user_) {
					if(!err)
					{
						console.log(user_);
						user_.favoritos.push(code_wine);
						user_.save(function(err) {
							if(err){
								console.log('Error guardando el vino en favoritos', err.message);
							}else{
								console.log('Vino guardado en favoritos correctamente..!');
								res.send(user_);
							}
						})
					}else{
						console.log(err.message);
					}
				})
			}else{
				console.log('El vino ya lo tienes en favoritos');
			}
		}else{
			console.log(err.message);
		}
	})
}
	//GET
exports.findWineById = function(req, res) {

	Vino.findById(req.params.id, function(err, vino) {
		if(!err) res.send(vino);
		else console.log("ERROR: " + err.message);
	});
}

exports.findWineByCode = function(req, res) {

	var userRank 	= req.query.rank;
	var wine 		= req.query.wine;
	var usuario 	= req.query.usuario;
	var type;

	var x = JSON.parse(wine);
	var y = JSON.parse(usuario);

	console.log('Codigo del vino: ' + x.image);

    Vino.find({code: x.code}, function(err, vino) {
    	if(!err)
    	{
    		console.log('>>>>>>>', vino);
    		if(vino == '')
    		{
    			if(x.type == 'Red Wine' || x.color == 'Red')
				{
					type = 'Negre';
				}else if(x.type == 'White Wine' || x.color == 'White')
				{
					type = 'Blanc';
				}else if(x.type == 'Rose Wine' || x.color == 'Rose')
				{
					type = 'Rosat';
				}

				var puntuacion = new Puntuacion({
					usuario 	: y,//usuario que hay logeado en ese momento,
					usuName 	: y.nombre,
					vineName 	: x.name,
					puntuacion 	: userRank
				})

				puntuacion.save(function(err) {
					if(!err) console.log('>>> Puntuacion guardada');
					else console.log('ERROR: ' + err.message);
				})

				x.vintage = parseInt(x.vintage);

    			var wine_ = new Vino({
    				code 		: x.code,
					name 		: x.name,
					price 		: x.price,
					type 		: type,
					region 		: x.region,
					winery 		: x.winery,
					varietal	: x.varietal,
					alcohol		: x.alcohol,
					image_url 	: x.image,
					reviews		: x.reviews,
					wm_notes 	: x.wm_notes,
					snoothrank 	: x.snoothrank,
					year 		: x.vintage,
					rates 		:[puntuacion]
    			})

    			wine_.save(function(err) {
					if(!err) console.log('>>>> Vino guardado!');
					else console.log('ERROR: ' + err.message);
				});

    			//crear rating
    			res.send(wine_);
    			//el vino no existe.post
    		}else{

    			var puntuacion = new Puntuacion({
					usuario 	: y,//usuario que hay logeado en ese momento,
					usuName 	: y.nombre,
					vineName 	: x.name,
					puntuacion 	: userRank
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
	console.log('query', req.query);
	console.log('body', req.body);
	console.log('params', req.params);
	console.log('files', req.files);

	//code wine
	var codeWine	= req.body.wine.name.split(' ');
	codeWine  		= codeWine.join('-').toLowerCase();
	console.log(codeWine);
	//console.log(file.name);
    //console.log(file.type);
    //console.log(file.path);
    //console.log(file);

	var wine = new Vino({
		code 	: codeWine,
		name 	: req.body.wine.name,
		type 	: req.body.wine.type,
		winery 	: req.body.wine.winery,
		region 	: req.body.wine.region,
		varietal: req.body.wine.varietal,
		year 	: req.body.wine.vintage,
		alcohol : req.body.wine.alcohol,
		price 	: req.body.wine.price,
		createAt: Date.now(),
	});

	if (req.files != undefined) {
		var file = req.files.file;

		wine.image.data = fs.readFileSync(file.path),
		wine.image.contentType = file.type
	}

	wine.save(function(err) {
		if(!err){
			res.send(wine); console.log('Vino guardado!');
		}
		else console.log('ERROR: ' + err.message);
	});

	//res.send(wine);
}

exports.getTopWines = function (req, res) {

	var whiteWines = [];
	var redWines   = [];
	var roseWines  = [];
	var allWines   = [];

	Vino.aggregate([
		{'$lookup': {
			from: 'puntuacions',
			localField:'name',
			foreignField:'vineName',
			as:'arrayWines'
			}
		},
		{'$unwind':'$arrayWines'},
		{$group:{_id: '$code', code:{$first: '$code'}, name:{$first: '$name'}, type:{$first:'$type'}, snoothrank:{'$avg':'$arrayWines.puntuacion'}}},
		{$sort: {media: -1}},
		{$match: {type: "Negre"}},
		{$limit: 3}
		],function(err, vinos) {
			if(!err)
			{
				redWines = vinos;
				var options = {
					host: 'api.snooth.com',
					path: "/wines/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&n=3&q=Catalunya&s=sr&xp=100&color=red"
				};

				callback = function(response) {
			  		var string = '';
			  		response.on('data', function (chunk) {
			    		string += chunk;
			  		});
			  		response.on('end', function () {

			  			var snoothWines = JSON.parse(string);

			  			redWines = redWines.concat(snoothWines.wines);
						for(var i=0; i<redWines.length; i++)
						{
							for(var j=i+1; j<redWines.length; j++)
							{
								if(redWines[i].code === redWines[j].code)
								{
									redWines.splice(j--,1);
								}
							}
						}
						redWines.sort(function(a,b) {
							return b.snoothrank - a.snoothrank;
						})
						redWines = redWines.slice(0,3);
						for(var i = 0; i<redWines.length; i++)
						{
							redWines[i].TopRank = (i+1);
						}

						Vino.aggregate([
							{'$lookup': {
								from: 'puntuacions',
								localField:'name',
								foreignField:'vineName',
								as:'arrayWines'
								}
							},
							{'$unwind':'$arrayWines'},
							{$group:{_id: '$code',code:{$first: '$code'}, name:{$first: '$name'}, type:{$first:'$type'}, snoothrank:{'$avg':'$arrayWines.puntuacion'}}},
							{$sort: {media: -1}},
							{$match: {type: "Blanc"}},
							{$limit: 3}
							],function(err, vinos) {
								if(!err)
								{
									whiteWines = vinos;
									var options = {
										host: 'api.snooth.com',
										path: "/wines/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&n=3&q=Catalunya&s=sr&xp=100&color=white"
									};

									callback = function(response) {
								  		var string = '';
								  		response.on('data', function (chunk) {
								    		string += chunk;
								  		});
								  		response.on('end', function () {

								  			var snoothWines = JSON.parse(string);
								  			whiteWines = whiteWines.concat(snoothWines.wines);
											for(var i=0; i<whiteWines.length; i++)
											{
												for(var j=i+1; j<whiteWines.length; j++)
												{
													if(whiteWines[i].code === whiteWines[j].code)
													{
														whiteWines.splice(j--,1);
													}
												}
											}
											whiteWines.sort(function(a,b) {
												return b.snoothrank - a.snoothrank;
											})
											whiteWines = whiteWines.slice(0,3);
											for(var i = 0; i<whiteWines.length; i++)
											{
												whiteWines[i].TopRank = (i+1);
											}

											Vino.aggregate([
												{'$lookup': {
													from: 'puntuacions',
													localField:'name',
													foreignField:'vineName',
													as:'arrayWines'
													}
												},
												{'$unwind':'$arrayWines'},
												{$group:{_id: '$code',code:{$first: '$code'}, name:{$first: '$name'}, type:{$first:'$type'}, snoothrank:{'$avg':'$arrayWines.puntuacion'}}},
												{$sort: {media: -1}},
												{$match: {type: "Rosat"}},
												{$limit: 3}
												],function(err, vinos) {
													if(!err)
													{
														roseWines = vinos;
														var options = {
															host: 'api.snooth.com',
															path: "/wines/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&n=3&q=Catalunya&s=sr&xp=100&color=rose"
														};

														callback = function(response) {
													  		var string = '';
													  		response.on('data', function (chunk) {
													    		string += chunk;
													  		});
													  		response.on('end', function () {

													  			var snoothWines = JSON.parse(string);

													  			roseWines = roseWines.concat(snoothWines.wines);
																for(var i=0; i<roseWines.length; i++)
																{
																	for(var j=i+1; j<roseWines.length; j++)
																	{
																		if(roseWines[i].code === roseWines[j].code)
																		{
																			roseWines.splice(j--,1);
																		}
																	}
																}
																roseWines.sort(function(a,b) {
																	return b.snoothrank - a.snoothrank;
																})
																roseWines = roseWines.slice(0,3);
																for(var i = 0; i<roseWines.length; i++)
																{
																	roseWines[i].TopRank = (i+1);
																}
																allWines = {red:redWines,white:whiteWines,rose:roseWines};
																console.log(allWines);
																res.send(allWines);
													  		});
													  	}

													  	http.request(options, callback).end();

													}else{
														res.send(err.message);
													}
											})
								  		});
								  	}
								  	http.request(options, callback).end();
								}else{
									res.send(err.message);
								}
						})
			  		});
			  	}
			  	http.request(options, callback).end();
			}else{
				res.send(err.message);
			}
		})
}

	//PUT
exports.updateWine = function(req, res) {

	console.log('Body', req.body);

	Vino.findById(req.params.id, function(err, vino) {
		vino.name 		= req.body.name;
		vino.type 		= req.body.type;
		vino.winery 	= req.body.winery;
		vino.region 	= req.body.region;
		vino.varietal	= req.body.varietal;
		vino.year 		= req.body.year;
		vino.alcohol 	= req.body.alcohol;

		vino.save(function(err) {
			if(!err) console.log('Vino actualizado');
			else console.log('ERROR: ' + err);
		});

	});

}

exports.latestWines = function(req, res) {

	Vino.aggregate(
		[
			{$sort: {createAt: -1}},
			{$limit: 3}
		], function(err, vinos) {
		if(!err)
		{
			var vi = vinos;
			for(var i=0; i<vi.length; i++)
			{
				if (vi[i].createAt == null || vi[i].createAt == undefined || vi[i].createAt == '') {
					vi.splice(i);
				}
			}
			res.send(vi)
		}else{
			res.send(err)
		}
	})
}

exports.allWines = function(req, res) {

	Vino.find({createAt: {$exists: true}}, function(err, vinos) {
		if(!err)
		{
			res.send(vinos)
		}else{
			res.send(err);
		}
	})
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
