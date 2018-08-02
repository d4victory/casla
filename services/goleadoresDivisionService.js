var mongoose = require('mongoose')
var GoleadoresDivision = mongoose.model('GoleadoresDivision')
var Division = mongoose.model('Division')
var Equipo = mongoose.model('Equipo')
var Jugador = mongoose.model('Jugador')
var logger = require('../logger')

exports.findGoleadoresDivisionByDivisionId = function (req, res) {
  GoleadoresDivision.find({division: req.params.id}, function (err, goleadoresDivision) {
    goleadoresDivision.sort(function (a, b) {
      return (a.cantidadDeGoles < b.cantidadDeGoles) ? 1 : ((b.cantidadDeGoles < a.cantidadDeGoles) ? -1 : ((a.cantidadDeGoles - a.cantidadDeGoles) < (b.cantidadDeGoles - b.cantidadDeGoles)) ? 1 : ((a.cantidadDeGoles - a.cantidadDeGoles) > (b.cantidadDeGoles - b.cantidadDeGoles)) ? -1 : (a.cantidadDeGoles < b.cantidadDeGoles) ? 1 : (a.cantidadDeGoles > b.cantidadDeGoles) ? -1 : 0)
    })

    if (err) return res.send(500, err.message)
    if (!goleadoresDivision) return res.send(404, 'goleadoresDivision not found')
    console.log('GET /goleadoresDivision/' + req.params.id)
    res.status(200).jsonp(goleadoresDivision)
    console.log(goleadoresDivision)
  })
}

//GET - Return all divisiones in the DB
exports.findAllGoleadoresDivision = function (req, res) {
  GoleadoresDivision.find(function (err, goleadores) {
    if (err) res.send(500, err.message)

    console.log('GET /goleadores')
    res.status(200).jsonp(goleadores)
  })
}

//POST
exports.addGoleadoresDivision = function (req, res) {
  console.log('POST')
  console.log(req.body)

  Equipo.findById(req.body.equipo, function (err, equipo) {
    if (err) {
      console.log('Error findById addGoleadoresDivision')
      console.log(err.message)
      return res.status(500).send(err.message)
    }
    if (!equipo) {return res.send(404, 'Equipo not found')}

    var goleadorDivision = new GoleadoresDivision({
      equipo: req.body.equipo,
      cantidadDeGoles: 0,
      division: equipo.division,
      idJugador: req.body._id
    })

    goleadorDivision.save(function (err, goleadorDivision) {
      if (err) {
        console.log('err save goleadorDivision addGoleadoresDivision')
        console.log(err.message)
        return res.status(500).send(err.message)
      }
      res.status(200).jsonp(goleadorDivision)
    })
  })
}
