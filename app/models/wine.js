var Puntuacion = require('./puntuacion');
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wineSchema = new Schema({
  name:    		{ type: String }, //nombre del vino
  code:       { type:String},
  type:     	{
  					type: String,
  					enum: ['Tinto','Rosado','Blanco']
  				},
  winery:  		{ type: String }, //Viñedo
  grape_type:   { type: String }, //tipo de uva
  year:  		{ type: Number }, // añada
  alcohol: 		{ type: Number },  //grados de alcohol
  rates:  [{ type: Schema.ObjectId, ref: "Puntuacion" }],
});

module.exports = mongoose.model('Vino', wineSchema);

/*
Sin embargo la referencia Usuario con Comentario se ve claramente que debe ser una referencia entre documentos,
ya que el Usuario puede cambiar sus datos en cualquier momento sin que el Comentario se de cuenta,
por lo que es importante enlazarlos con una relación aunque perdamos un nivel de indirección a la hora de consultar.
*/
