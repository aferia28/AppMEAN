var mongoose = require('mongoose');
var Usuario = require('./persona');
    Schema   = mongoose.Schema;

var comentario = new Schema({
  usuario 		: { type: Schema.ObjectId, ref: "Usuario" },
  usuario_name 	: { type: String },
  texto 		: { type: String },
  time 			: { type: Date }
});

module.exports = mongoose.model('Comentario', comentario);
