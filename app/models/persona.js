var mongoose = require('mongoose');

module.exports = mongoose.model('persona', {
	nombre: String,
	apellido: String,
	edad: String,
	email: String,
	direccion: String,
	nickname: String,
	password: String
});
