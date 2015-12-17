var Persona 	= require('../models/persona');
var Controller 	= require('../controllers/controller.registro.api');

module.exports = function(app) {


	app.get('/api/persona', Controller.getPersona); //el servidor recibe la peticion con la url que le manda angular
													//y ejecuta la funcion del contorlador..

	app.post('/api/persona', Controller.setPersona);

	app.put('/api/persona/:persona_id', Controller.updatePersona);

	app.delete('/api/persona/:persona_id', Controller.deletePersona);

	/*app.get('*', function(req, res){
		res.sendFile(__dirname + './public/views/layouts/main.html');
	});*/
}
