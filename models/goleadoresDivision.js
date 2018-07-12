var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var goleadoresDivisionSchema = new Schema({
  division: {type: Schema.Types.ObjectId, ref: 'Division'},
  idJugador: {type: Schema.Types.ObjectId, ref: 'Jugador'},
  jugadorNombre: {type:String},
  equipoNombre: {type:String},
  equipo: {type: String},
  cantidadDeGoles: {type: Number}
});

module.exports = mongoose.model('GoleadoresDivision', goleadoresDivisionSchema);
