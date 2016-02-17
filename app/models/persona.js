var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var personaSchema = new Schema({
  nombre:    { type: String },
  apellidos:     { type: String },
  email:  { type: String },
  password:   { type: String },
  isAdmin: { type: Boolean }
});

module.exports = mongoose.model('Persona', personaSchema);
