var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var personaSchema = new Schema({
  nombre:    { type: String },
  apellidos:     { type: String },
  email:  { type: String },
  contraseña:   { type: String },
  r_contraseña:  { type: String },
});

module.exports = mongoose.model('Persona', personaSchema);
