
var Vino = require('../models/wine.js');

	//GET
exports.findAllWines =  function(req, res) {

	Vino.find(function(err, vinos) {
		if(!err) res.send(vinos);
		else console.log('ERROR: ' + err);
	});
}

	//GET
exports.findWineById = function(req, res) {

	Vino.findById(req.params.id, function(err, vino) {
		if(!err) res.send(vino);
		else console.log("ERROR: " + err.message);
	});
}

	//POST
exports.addWine = function(req, res) {

	console.log("POST");
	console.log(req.body);

	var wine = new Vino({
		name: req.body.name,
		type: req.body.type,
		winery: req.body.winery,
		grape_type: req.body.grape_type,
		year: req.body.year,
		alcohol: req.body.year
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
