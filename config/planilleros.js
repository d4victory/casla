module.exports = function (app, client) {

  app.get('/planillero', isPlanillero, function (req, res) {
    client.get('/partido/estado/N.E.', function (err, response, partidos) {
      client.get('/equipo', function (err, response, equipos) {
        var equiposMap = {}
        for (var i = 0; i < equipos.length; i++) {
          equiposMap[equipos[i]._id] = equipos[i].nombre
        }

        client.get('/division', function (err, response, divisiones) {
          var divisionesMap = {}
          for (var i = 0; i < divisiones.length; i++) {
            divisionesMap[divisiones[i]._id] = divisiones[i].nombre
          }

          client.get('/partido/numeros_fechas', function (err, response, numeros_fechas) {
            res.render('./ejs/partidos/partidos.ejs', {
              user: req.user,
              partidos: partidos,
              message: req.flash('loginMessage'),
              numeros_fechas: numeros_fechas,
              divisiones: divisiones,
              divisionesMap: divisionesMap,
              equipos: equiposMap,
              resultado: req.session.statusDelete
            })
          })
        })
      })
    })
  })

  app.get('/cargarPartido', isPlanillero, function (req, res) {
    client.get('/partido/' + req.query.partidoid, function (err, response, partido) {
      client.get('/division', function (err, response, divisiones) {
        client.get('/jugador/equipo/' + partido.equipo1, function (err, response, jugadores1) {
          client.get('/jugador/equipo/' + partido.equipo2, function (err, response, jugadores2) {
            res.render('./ejs/partidos/cargarPartido.ejs', {
              user: req.user,
              divisiones: divisiones,
              partido: partido,
              jugadoresEquipo1: jugadores1,
              jugadoresEquipo2: jugadores2,
              message: req.flash('loginMessage'),
              resultado: req.session.statusSaved
            })
          })
        })
      })
    })
  })

  app.post('/cargarPartido', isPlanillero, function (req, res) {
    client.put({url: ('/partido/' + req.query.partidoid), body: req.body}, function (err, response, data) {
      if (err) {
        console.log('ERROR en PUT de /cargarPartido')
        console.log(err)
        console.log('something went wrong al cargar partido', err.request.options)
      }

      data.data['equipo1Old'] = data.equipo1Old
      data.data['equipo2Old'] = data.equipo2Old
      data.data['status'] = data.status
      data.data['statusOld'] = data.statusOld

      client.post({url: ('/posicionEquipo/updatePosicionEquipo/'), body: data.data}, function (err, response, data) {
        if (err) {
          console.log('ERROR en POST de /cargarPartido')
          console.log(err)
          console.log('something went wrong al cargar partido', err.request.options)
        }
        console.log('POST de /posicionEquipo/updatePosicionEquipo/')
        console.log('response statusCode:' + response.statusCode)
        res.redirect('/partidos')

        // client.post({
        //   url: ('/goleadoresDivision/updateGoleadoresDivision/'),
        //   body: data.data
        // }, function (err, response, data) {
        //   if (err) {
        //     console.log('ERROR en POST de /goleadoresDivision/updateGoleadoresDivision/')
        //     console.log(err)
        //     console.log('something went wrong al cargar partido', err.request.options)
        //   }
        //   console.log('POST de /goleadoresDivision/updateGoleadoresDivision/')
        //   console.log('response statusCode:' + response.statusCode)
        //   res.redirect('/partidos')
        // })

      })
    })
  })

}

// route middleware to make sure a user is logged in (PLANILLERO)
function isPlanillero (req, res, next) {

  // if user is authenticated in the session, carry on
  if ((req.isAuthenticated()) && ( (req.user.role == 'PLANILLERO') || (req.user.role == 'ADMIN') || (req.user.role == 'SUPER_ADMIN')))
    return next()

  // if they aren't redirect them to the home page
  res.redirect('/')
}
