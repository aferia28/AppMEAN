//var Persona 	= require('../models/persona');
var Controller 			= require('../controllers/controller.registro.api');
var wineController 		= require('../controllers/controller.wines');
var auth				= require('../controllers/controller.auth');
var verification		= require('../controllers/controller.verification');
var middleware 			= require('../middleware');
var middlewareAdmin 	= require('../middlewareAdmin');

module.exports = function(app) {

	app.get('/persona', Controller.getPersona); //

	app.get('/allprofiles', Controller.getAllProfiles);

	app.get('/perfil/:userId', Controller.getUserProfile);

	app.post('/auth/signup', auth.emailSignup);

	app.post('/auth/login', auth.emailLogin);

	app.delete('/eliminarPersona/:id', Controller.deleteUser)

	app.put('/modificarPersona/:id',multipartyMiddleware, Controller.updatePersona);

	app.put('/eliminarfavorito/:id', Controller.deleteFavoriteWine);


	app.get('/lastlogin', Controller.latestLogin);
	app.get('/lastSignup', Controller.lastSignUp)

	app.get('/send/:email', verification.sendEmail);

	app.get('/verify', verification.verifiedEmail);



	app.post('/addFavorite/:codeWine', wineController.addFavorite);

	app.post('/addCommentWine/:codeWine', wineController.addComment);

	app.get('/topwines', wineController.getTopWines)

	app.get('/getWine', wineController.findWine);

	app.get('/vinos', wineController.findAllWines);

	app.get('/vinos/:id', wineController.findWineById);

	app.post('/vinosCode/:codeWine', wineController.findWineByCode);

	app.post('/addWine', multipartyMiddleware, wineController.addWine);

	app.put('/modificarVino/:id', wineController.updateWine);

	app.delete('/eliminarVino/:id', wineController.deleteWine);

	app.get('/admin', middlewareAdmin.ensureAdmin, function(req,res) {
		res.render('layouts/admin.html');
	});

	// Ruta solo accesible si estás autenticado
 	//app.get('/private',middleware.ensureAuthenticated, function(req, res) {res.send('HELLO WORLD')} );

	//app.get('/api/persona', Controller.getPersona); //el servidor recibe la peticion con la url que le manda angular
													//y ejecuta la funcion del contorlador..

	//app.post('/api/persona', Controller.setPersona);

	//app.put('/api/persona/:persona_id', Controller.updatePersona);

	//app.delete('/api/persona/:persona_id', Controller.deletePersona);

	/*app.get('*', function(req, res){
		res.sendFile(__dirname + './public/views/layouts/main.html');
	});*/
}
