var Puntuacion = require('./puntuacion');
var Comentario = require('./comentario');
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var wineSchema = new Schema({
  name          : { type: String }, //nombre del vino
  code          : { type:String},
  type          : {
  					type: String,
  					enum: ['Negre','Blanc','Rosat']
  			   },
  winery        : { type: String }, //Viñedo
  price         : { type: String },
  varietal      : { type: String }, //tipo de uva
  region        : { type: String},
  vintage          : { type: Number }, // añada
  alcohol       : { type: Number },  //grados de alcohol
  rates         : [{ type: Schema.ObjectId, ref: "Puntuacion" }],
  comentarios   : [{ type: Schema.ObjectId, ref: "Comentario" }],
  createAt      : {type: Date},
  image_url     : {type: String},
  image         : { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Vino', wineSchema);
