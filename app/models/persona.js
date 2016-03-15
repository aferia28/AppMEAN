var Vino = require('./wine');
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var personaSchema = new Schema({
  nombre:    { type: String },
  apellidos:     { type: String },
  email:  { type: String },
  password:   { type: String },
  isAdmin: { type: Boolean },
  verified: { type: Boolean},
  favoritos:  [{ type: String }]
});

module.exports = mongoose.model('Persona', personaSchema);
