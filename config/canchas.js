module.exports = function (app, isAdmin, client) {

  app.post('/nuevaCancha', isAdmin, function (req, res) {
    client.get('/division', function (err, response, divisiones) {
      client.get('/torneo/' + req.body.torneoid, function (err, response, torneo) {
        res.render('./ejs/canchas/agregarCancha.ejs', {
          user: req.user,
          torneo: torneo,
          divisiones: divisiones,
          message: req.flash('loginMessage')
        })
      })
    })
  })

  app.post('/agregarCancha', isAdmin, function (req, res) {
    client.post({url: '/cancha/', body: req.body}, function (err, response, data) {
      console.log("POST /cancha");
      res.redirect('/canchasDelTorneo?torneoid='+data.torneo._id);
    })
  })

  app.get('/canchasDelTorneo', isAdmin, function (req, res) {
    console.log('canchasDelTorneo: ' + req.query.torneo)
    console.log('canchasDelTorneo: ' + req.query.torneoid)
    client.get('/torneo/' + req.query.torneoid, function (err, response, torneo) {
      client.get('/division', function (err, response, divisiones) {
        client.get('/cancha/torneo/' + req.query.torneoid, function (err, response, canchas) {
          res.render('./ejs/canchas/canchasDelTorneo.ejs', {
            user: req.user, canchas: canchas, divisiones: divisiones,
            torneo: torneo, message: req.flash('loginMessage')
          })
        })
      })
    })

  })

  app.post('/deleteCancha', isAdmin, function (req, res) {
    client.delete('/cancha/' + req.body.canchaid, function (data, response) {
      res.redirect('/canchasDelTorneo?torneoid=' + response.body.torneo)
    })
  })
}
