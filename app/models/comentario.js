var mongoose = require('mongoose');
var Usuario = require('./persona');
    Schema   = mongoose.Schema;

var comentario = new Schema({
  usuario 	: { type: Schema.ObjectId, ref: "Usuario" },
  texto 	: { type: String},
  time 		: { type: Timestamp}
});

module.exports = mongoose.model('Comentario', comentario);
