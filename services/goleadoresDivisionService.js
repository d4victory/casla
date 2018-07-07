var mongoose = require('mongoose')
var GoleadoresDivision = mongoose.model('GoleadoresDivision')
var Division = mongoose.model('Division')
var Equipo = mongoose.model('Equipo')
var Jugador = mongoose.model('Jugador')
var logger = require('../logger')

exports.findGoleadoresDivisionByDivisionId = function (req, res) {
  GoleadoresDivision.find({division: req.params.id}, function (err, goleadoresDivision) {
    if (err) return res.send(500, err.message)
    if (!goleadoresDivision) return res.send(404, 'goleadoresDivision not found')
    console.log('GET /goleadoresDivision/' + req.params.id)
    res.status(200).jsonp(goleadoresDivision)
    console.log(goleadoresDivision)
  })
}

//POST - Insert a new GoleadoresDivision in the DB
exports.goleadoresDivisionAdd = function (req, res) {
  console.log('POST')
  console.log(req.body._id)
  console.log(req.body)

  var nuevo = new GoleadoresDivision({
    //division: req.body.equipo.division,
    equipo: req.body.equipo,
    idJugador: req.body._id,
    cantidadDeGoles: 0
  })

  //GoleadoresDivision.findByIdAndUpdate({_id: req.body._id}, function (err, goleadoresDivision) {
  nuevo.save(function (err, saved) {
    if (err) return res.status(500).send(err.message)
    logger.info(req.user + ' ha guardado los goleadoresDivision')
    res.status(200).jsonp(saved)
  })
  //})
}

//PUT - Update a division already exists
exports.updateGoleadoresDivision = function (req, res) {
  GoleadoresDivision.findById(req.params.id, function (err, goleadoresDivision) {

    if (err) return res.send(500, err.message)
    if (!equipo) {return res.send(404, 'goleadoresDivision not found')}

    goleadoresDivision.cantidadDeGoles = req.body.cantidadDeGoles
    goleadoresDivision.equipo = req.body.equipo
    goleadoresDivision.division = req.body.division
    goleadoresDivision.idJugador = req.body.jugador

    goleadoresDivision.save(function (err) {
      if (err) return res.send(500, err.message)
      res.status(200).jsonp(goleadoresDivision)
    })
  })
}

exports.cargaDePartido = function (req, res) {

  GoleadoresDivision.findOne({idJugador: req.body.idJugador}, function (err, goleadoresDivision1) {
    GoleadoresDivision.findOne({idJugador: req.body.idJugador}, function (err, goleadoresDivision2) {
      if (goleadoresDivision1 != null && goleadoresDivision2 != null) {
        if ((req.body.status == 'FIN')) {
          goleadoresDivision.nombre = req.body.nombre
          goleadoresDivision.apellido = req.body.apellido
          goleadoresDivision.cantidadDeGoles = req.body.cantidadDeGoles
          goleadoresDivision.equipo = req.body.equipo
          goleadoresDivision.division = req.body.division

        }
        // if(req.body.equipo1Old != null && req.body.equipo2Old !=null && (req.body.statusOld == "FIN")){
        //   posicion1.jugados = posicion1.jugados - 1;
        //   posicion2.jugados = posicion2.jugados - 1;
        //   posicion1.golesFavor = posicion1.golesFavor - req.body.equipo1Old;
        //   posicion1.golesContra = posicion1.golesContra - req.body.equipo2Old;
        //   posicion2.golesFavor = posicion2.golesFavor - req.body.equipo2Old;
        //   posicion2.golesContra = posicion2.golesContra - req.body.equipo1Old;
        //
        //   if(req.body.equipo1Old > req.body.equipo2Old){
        //     posicion1.ganados = posicion1.ganados - 1;
        //     posicion1.puntos = posicion1.puntos - 3;
        //     posicion2.perdidos = posicion2.perdidos - 1;
        //   } else if(req.body.equipo1Old < req.body.equipo2Old){
        //     posicion2.puntos = posicion2.puntos - 3;
        //     posicion2.ganados = posicion2.ganados - 1;
        //     posicion1.perdidos = posicion1.perdidos - 1;
        //   } else {
        //     posicion1.puntos = posicion1.puntos - 1;
        //     posicion2.puntos = posicion2.puntos - 1;
        //     posicion1.empatados = posicion1.empatados - 1;
        //     posicion2.empatados = posicion2.empatados - 1;
        //   }
        //
        // }

        goleadoresDivision1.save(function (err) {
          goleadoresDivision2.save(function (err) {
            if (err) return res.send(500, err.message)
            res.status(200).jsonp(goleadoresDivision2)
          })
        })

      } else {
        //Todo ver que pasa
        res.status(404)
      }
    })
  })
}

//DELETE - Delete a goleadoresDivision with specified ID
// exports.deleteGoleadoresDivision = function (req, res) {
//   Jugador.findById(req.params.id, function (err, jugador) {
//     GoleadoresDivision.findById({idJugador: jugador._id}, function (err, goleadoresDivision) {
//       if (err) return res.send(500, err.message)
//       if (!goleadoresDivision) {return res.send(404, 'goleadoresDivision not found')}
//       goleadoresDivision.remove(function (err) {
//         if (err) return res.send(500, err.message)
//         logger.info(req.user + ' ha borrado al goleadoresDivision ' + goleadoresDivision.apellido + ', ' + goleadoresDivision.nombre + ' de id: ' + goleadoresDivision._id)
//         res.status(200).jsonp('Successfully deleted')
//       })
//     })
//   })
// }
