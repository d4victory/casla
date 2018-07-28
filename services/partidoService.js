var mongoose = require('mongoose')
var Partido = mongoose.model('Partido')
var Equipo = mongoose.model('Equipo')
var Torneo = mongoose.model('Torneo')
var Division = mongoose.model('Division')
var GoleadoresDivision = mongoose.model('GoleadoresDivision')
var Jugador = mongoose.model('Jugador')
var logger = require('../logger')

//GET - Return all partidos in the DB
exports.findAllPartidos = function (req, res) {
  Partido.find(function (err, partidos) {
    if (err) res.send(500, err.message)

    console.log('GET /partido')
    res.status(200).jsonp(partidos)
  })
}

//GET - Return a partido with specified ID
exports.findById = function (req, res) {
  Partido.findById(req.params.id, function (err, partido) {
    if (err) return res.send(500, err.message)
    if (!partido) return res.send(404, 'Partido not found')
    console.log('GET /partido/' + req.params.id)
    res.status(200).jsonp(partido)
  })
}

//GET - Return partidos from a fecha_numero
exports.findByFechaNumero = function (req, res) {
  Partido.find({'fecha_numero': req.params.fecha_numero}, function (err, partidos) {
    if (err) return res.send(500, err.message)
    console.log('GET /partido/fecha_numero/' + req.params.fecha_numero)
    res.status(200).jsonp(partidos)
  })
}

//GET - Return partidos from a fecha_numero
exports.findByCancha = function (req, res) {
  Partido.find({'cancha': req.params.cancha_id}, function (err, partidos) {
    if (err) return res.send(500, err.message)
    console.log('GET /partido/cancha/' + req.params.cancha_id)
    res.status(200).jsonp(partidos)
  })
}

//GET - Return partidos with an estado
exports.findByEstado = function (req, res) {
  Partido.find({'estado': req.params.estado}, function (err, partidos) {
    if (err) return res.send(500, err.message)
    console.log('GET /partido/estado/' + req.params.estado)
    res.status(200).jsonp(partidos)
  })
}

//GET - Returns distinct fecha_numero from partidos
exports.findNumerosFechasDisponibles = function (req, res) {
  Partido.find().distinct('fecha_numero', function (error, numeros_fechas) {
    console.log('GET /partido/numeros_fechas')
    res.status(200).jsonp(numeros_fechas)
  })
}

//GET - Returns distinct fecha_numero from partidos by Division
exports.findNumerosFechasDisponiblesByDivision = function (req, res) {
  Partido.find({'division': req.params.division}).distinct('fecha_numero', function (error, numeros_fechas) {
    console.log('GET /partido/numeros_fechas')
    res.status(200).jsonp(numeros_fechas)
  })
}

//POST - Insert a new partido in the DB
exports.addPartido = function (req, res) {
  console.log('POST /partido')
  console.log(req.body)

  Torneo.findById(req.body.torneo, function (err, torneo) {
    if (err) return res.send(500, err.message)
    if (!torneo) {return res.send(404, 'Torneo id not found')}

    Division.findById(req.body.division, function (err, division) {
      if (err) return res.send(500, err.message)
      if (!division) {return res.send(404, 'Division id not found')}

      Equipo.findById(req.body.equipo1, function (err, equipo1) {
        if (err) return res.send(500, err.message)
        if (!equipo1) {return res.send(404, 'Equipo 1 id not found')}
        if (!(equipo1.division.equals(division._id))) {return res.send(400, 'El Equipo 1 no pertenece a la division ' + division.nombre)}

        Equipo.findById(req.body.equipo2, function (err, equipo2) {
          if (err) return res.send(500, err.message)
          if (!equipo2) {return res.send(404, 'Equipo 2 id not found')}
          if (!(equipo2.division.equals(division._id))) {return res.send(400, 'El Equipo 2 no pertenece a la division ' + division.nombre)}

          var partido = new Partido({
            equipo1: req.body.equipo1,
            equipo2: req.body.equipo2,
            fecha: req.body.fecha + ' ' + (parseInt((req.body.hora).split(':')[0]) + 3) + ':' + (req.body.hora).split(':')[1],
            fecha_numero: req.body.fecha_numero,
            division: req.body.division,
            amonestados: req.body.amonestados,
            expulsados: req.body.expulsados,
            goles: req.body.goles,
            cambios: req.body.cambios,
            estado: 'N.E.'
          })

          if (req.body.cancha != '') {
            (partido['cancha'] = req.body.cancha)
          }

          console.log(partido)

          partido.save(function (err, partido) {
            if (err) return res.send(500, err.message)
            logger.info(req.user + ' ha agregado al partido ' + partido._id + ': ' + partido.equipo1 + ' VS ' + partido.equipo2 + ', fecha ' + partido.fecha_numero + ', el ' + partido.fecha)
            equipo1.partidos.push(partido)
            equipo1.save(function (err, equipo1) {
              if (err) return res.send(500, err.message)
              logger.info('El equipo ' + equipo1.nombre + ' ha agregado al partido ' + partido._id + ': ' + partido.equipo1 + ' VS ' + partido.equipo2)
              equipo2.partidos.push(partido)
              equipo2.save(function (err, equipo2) {
                if (err) return res.send(500, err.message)
                logger.info('El equipo ' + equipo2.nombre + ' ha agregado al partido ' + partido._id + ': ' + partido.equipo1 + ' VS ' + partido.equipo2)

                division.partidos.push(partido)
                division.save(function (err, division) {
                  if (err) return res.send(500, err.message)
                  logger.info('La division ' + division.nombre + ' ha agregado al partido ' + partido._id + ': ' + partido.equipo1 + ' VS ' + partido.equipo2)
                  res.status(200).jsonp(partido)
                })
              })
            })
          })
        })
      })
    })
  })
}

//PUT - Update a register already exists
exports.updatePartido = function (req, res) {
  console.log('estoy en partidoService /updatePartido')
  Partido.findById(req.params.id, function (err, partido) {

    var idPartido = partido._id

    if (err) return res.send(500, err.message)
    if (!partido) {return res.send(404, 'Partido: ' + partido._id + 'not found')}

    var response = {
      data: partido,
      equipo1Old: partido.marcador_equipo_1,
      equipo2Old: partido.marcador_equipo_2,
      status: req.body.estado_partido,
      statusOld: partido.estado,
      headers: {'Content-Type': 'application/json'}
    }

    partido.equipo1 = req.body.equipo1 == null ? partido.equipo1 : req.body.equipo1
    partido.equipo2 = req.body.equipo2 == null ? partido.equipo2 : req.body.equipo2
    partido.fecha_numero = req.body.fecha_numero == null ? partido.fecha_numero : req.body.fecha_numero
    partido.fecha = req.body.fecha == null ? partido.fecha : req.body.fecha
    var date = new Date(partido.fecha)
    if (req.body.horario != '') {
      date.setHours(parseInt((req.body.horario).split(':')[0]) + 3)
      date.setMinutes((req.body.horario).split(':')[1])
    } else {
      date.setHours(0)
      date.setMinutes(0)
    }
    partido.fecha = date
    partido.marcador_equipo_1 = req.body.goles_equipo1 == null ? partido.marcador_equipo_1 : req.body.goles_equipo1
    partido.marcador_equipo_2 = req.body.goles_equipo2 == null ? partido.marcador_equipo_2 : req.body.goles_equipo2
    partido.estado = req.body.estado_partido == null ? partido.estado : req.body.estado_partido
    partido.cancha = req.body.cancha == null ? partido.cancha : req.body.cancha
    if (req.body.cancha == '') {
      partido.cancha = null
    }

    partido.division = req.body.division == null ? partido.division : req.body.division
    partido.amonestados = req.body.amonestados == null ? partido.amonestados : req.body.amonestados
    partido.expulsados = req.body.expulsados == null ? partido.expulsados : req.body.expulsados
    partido.goles = req.body.goles == null ? partido.goles : req.body.goles
    partido.cambios = req.body.cambios == null ? partido.cambios : req.body.cambios
    partido.estado = req.body.estado_partido == null ? partido.estado : req.body.estado_partido

    //ARMO ARRAY DE GOLEADORESDIVISION Equipo1
    if(!req.body.golesJugadorEquipo1 === null && !req.body.golesJugadorEquipo1 === undefined) {
      Object.keys(req.body.golesJugadorEquipo1).map(function (key, index) {
        console.log('mongoose key' + mongoose.Types.ObjectId(key))
        GoleadoresDivision.find({idJugador: mongoose.Types.ObjectId(key)}, function (err, goleadoresDivision) {
          console.log('pase el goleadoresDivision')
          Jugador.findById(key, function (err, jugador) {
            console.log('pase el jugador')
            Equipo.findById(partido.equipo1, function (err, equipo1) {
              console.log('pase el equipo')
              if (err) return res.send(500, err.message)
              if (!jugador) return res.send(404, 'Jugador not found')
              console.log('GET /jugador/' + key)

              if (!goleadoresDivision.length > 0) {
                var goleador = new GoleadoresDivision()
                goleador.division = req.body.division == null ? partido.division : req.body.division
                goleador.equipo = req.body.equipo1 == null ? partido.equipo1 : req.body.equipo1
                goleador.equipoNombre = equipo1.nombre
                goleador.jugadorNombre = jugador.nombre + ' ' + jugador.apellido
                goleador.idJugador = key
                goleador.cantidadDeGoles = parseInt(req.body.golesJugadorEquipo1[key])
              } else {
                var goleador = goleadoresDivision.pop()
                goleador.division = req.body.division == null ? partido.division : req.body.division
                goleador.cantidadDeGoles = goleador.cantidadDeGoles + parseInt(req.body.golesJugadorEquipo1[key])
              }
              goleador.save(function (err) {
                if (err) return res.status(500).send(err.message)
              })
            })
          })
        })
      })
    }

    //ARMO ARRAY DE GOLEADORESDIVISION Equipo2
    if(!req.body.golesJugadorEquipo2 === null && !req.body.golesJugadorEquipo2 === undefined) {
      Object.keys(req.body.golesJugadorEquipo2).map(function (key, index) {
        console.log('key' + key)
        GoleadoresDivision.find({idJugador: mongoose.Types.ObjectId(key)}, function (err, goleadoresDivision) {
          Jugador.findById(key, function (err, jugador) {
            Equipo.findById(partido.equipo2, function (err, equipo2) {
              console.log(JSON.stringify(goleadoresDivision))
              console.log('division' + req.body.division)
              if (!goleadoresDivision.length > 0) {
                var goleador = new GoleadoresDivision()
                goleador.division = req.body.division == null ? partido.division : req.body.division
                goleador.equipo = req.body.equipo2 == null ? partido.equipo2 : req.body.equipo2
                goleador.equipoNombre = equipo2.nombre
                goleador.jugadorNombre = jugador.nombre + ' ' + jugador.apellido
                goleador.idJugador = key
                goleador.cantidadDeGoles = parseInt(req.body.golesJugadorEquipo2[key])
              } else {
                var goleador = goleadoresDivision.pop()
                goleador.division = req.body.division == null ? partido.division : req.body.division
                goleador.cantidadDeGoles = goleador.cantidadDeGoles + parseInt(req.body.golesJugadorEquipo2[key])
              }
              goleador.save(function (err) {
                if (err) return res.status(500).send(err.message)
              })
            })
          })
        })
      })
    }

    partido.save(function (err) {
      if (err) return res.status(500).send(err.message)
      res.status(200).jsonp(response)
    })
  })
}

//DELETE - Delete a partido with specified ID
exports.deletePartido = function (req, res) {
  Partido.findById(req.params.id, function (err, partido) {

    var equipo1DelPartido = partido.equipo1
    var equipo2DelPartido = partido.equipo2
    var divisionDelPartido = partido.division

    Equipo.findById(equipo1DelPartido, function (err, equipo1DelPartido) {
      if (err) return res.send(500, err.message)
      if (!equipo1DelPartido) {return res.send(404, 'Equipo 1 id not found')}
      equipo1DelPartido.partidos.pop(partido)
      equipo1DelPartido.save(function (err, equipo1DelPartido) {
        if (err) return res.send(500, err.message)
        logger.info('El equipo ' + equipo1DelPartido.nombre + ' ha quitado al partido ' + partido.equipo1 + ' VS ' + partido.equipo2 + ', fecha ' + partido.fecha_numero)
      })
    })

    Equipo.findById(equipo2DelPartido, function (err, equipo2DelPartido) {
      if (err) return res.send(500, err.message)
      if (!equipo2DelPartido) {return res.send(404, 'Equipo 2 id not found')}
      equipo2DelPartido.partidos.pop(partido)
      equipo2DelPartido.save(function (err, equipo2DelPartido) {
        if (err) return res.send(500, err.message)
        logger.info('El equipo ' + equipo2DelPartido.nombre + ' ha quitado al partido ' + partido.equipo1 + ' VS ' + partido.equipo2 + ', fecha ' + partido.fecha_numero)
      })
    })

    Division.findById(partido.division, function (err, division) {
      if (err) return res.send(500, err.message)
      if (!division) {return res.send(404, 'Division id not found')}
      division.partidos.pop(partido)
      division.save(function (err, division) {
        if (err) return res.send(500, err.message)
        logger.info('La division ' + division.nombre + ' ha quitado al partido ' + partido.equipo1 + ' VS ' + partido.equipo2 + ', fecha ' + partido.fecha_numero)
      })
    })

    var response = {
      data: partido,
      equipo1Old: partido.marcador_equipo_1,
      equipo2Old: partido.marcador_equipo_2,
      statusOld: partido.estado,
      headers: {'Content-Type': 'application/json'}
    }

    partido.remove(function (err) {
      if (err) return res.send(500, err.message)
      logger.info(req.user + ' ha borrado el partido ' + partido.nombre)
      res.status(200).jsonp(response)
    })
  })
}

//GET - Return partidos from a fecha_numero
exports.deleteByEquipoId = function (req, res) {
  Partido.find({$or: [{'equipo1': req.params.id}, {'equipo2': req.params.id}]}, function (err, partidos) {

    for (var i = 0; i < partidos.length; i++) {
      Division.findById(partidos[i].division, function (err, division) {
        if (err) return res.send(500, err.message)
        if (!division) {
          return res.send(404, 'Division id not found')
        }
        division.partidos.pop(partido)
        division.save(function (err, division) {
          if (err) return res.send(500, err.message)
          logger.info('La division ' + division.nombre + ' ha quitado al partido ' + partido.equipo1 + ' VS ' + partido.equipo2 + ', fecha ' + partido.fecha_numero)
        })
      })

      partido.remove(function (err) {
        if (err) return res.send(500, err.message)
        logger.info(req.user + ' ha borrado el partido ' + partido.nombre)
        res.status(200).jsonp(partidos)
      })
    }
  })
}
//EXAMPLE POST
// {
//   "equipo1": "58865fe1c6058e592e000002",
//   "equipo2": "58865fe1c6058e592e000003",
//   "fecha_numero": 0,
//   "fecha": "2016-10-10",
//   "marcador_equipo_1": 0,
//   "marcador_equipo_2": 0,
//   "torneo": "58865fd4c6058e592e000002"
// }