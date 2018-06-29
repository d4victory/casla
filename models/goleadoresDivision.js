var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var goleadoresDivisionSchema = new Schema({
  division: {type: Schema.Types.ObjectId, ref: 'Division'},
  nombre: {type: String},
  apellido: {type: String},
  equipo: {type: Schema.Types.ObjectId, ref: 'Equipo'},
  cantidadDeGoles: {type: Number}
});

module.exports = mongoose.model('GoleadoresDivision', goleadoresDivisionSchema);
