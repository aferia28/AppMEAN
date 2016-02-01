var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wineSchema = new Schema({
  name:    		{ type: String }, //nombre del vino
  type:     	{
  					type: String,
  					enum: ['Tinto','Rosado','Blanco']
  				},
  winery:  		{ type: String }, //Viñedo
  grape_type:   { type: String }, //tipo de uva
  year:  		{ type: Number }, // añada
  alcohol: 		{ type: Number }  //grados de alcohol
});

module.exports = mongoose.model('Vino', wineSchema);
