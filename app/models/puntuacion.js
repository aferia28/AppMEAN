var mongoose = require('mongoose');
var Usuario = require('./persona');
    Schema   = mongoose.Schema;

var puntuacion = new Schema({
  usuario 	: { type: Schema.ObjectId, ref: "Usuario" },
  usuName 	: {type: String},
  vineName 	: { type: String},
  puntuacion 	: { type: Number}
});

module.exports = mongoose.model('Puntuacion', puntuacion);
