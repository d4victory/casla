module.exports = function(app,isAdmin, client) {

    app.get('/partidos', isAdmin, function(req, res) {
      client.get("/division", function (err, response, divisiones) {
        client.get("/partido/numeros_fechas", function (err, response, numeros_fechas) {
          res.render('./ejs/partidos/partidos.ejs', {
            message: req.flash('signupMessage'),
            numeros_fechas: numeros_fechas,
            user: req.user,
            divisiones: divisiones,
            resultado: req.session.statusDelete
          });
        });
      });
    });

    app.get('/partidosDelTorneo', isAdmin, function(req, res) {
      console.log('estoy en /partidosDelTorneo');
      client.get("/torneo/"+req.query.torneoid, function (err, response, torneo) {
        client.get("/division", function (err, response, divisiones) {
          res.render('./ejs/torneos/partidosTorneo.ejs', {
            user: req.user,
            divisiones: divisiones,
            torneo: torneo,
            message: req.flash('loginMessage')
          });
        });
      });
    });

    app.get('/agregarPartidos', isAdmin, function(req, res) {
        client.get("/torneo", function (err, response, data) {
            client.get("/division", function (err, response, divisiones) {
                res.render('./ejs/partidos/agregarPartidos.ejs', {user: req.user, divisiones:divisiones, torneos: data, message: req.flash('loginMessage')});
            });
        });
    });

    app.post('/agregarPartido', isAdmin, function(req, res) {
        client.post({url: "/partido", body: req.body}, function (err, response, data) {
            console.log("POST /partidos");
            res.redirect('/partidos');
        });
    });

    app.post('/deletePartido', isAdmin, function(req, res) {
      client.delete("/partido/"+req.body.partidoid, function (err, response, data) {
        data.data["equipo1Old"] = data.equipo1Old;
        data.data["equipo2Old"] = data.equipo2Old;
        data.data["statusOld"] = data.statusOld;

        client.post({url: "/posicionEquipo/updatePosicionEquipo/", body: data.data}, function (err, response, data) {
          console.log("DELETE /partido/"+req.body.partidoid);
          req.session.statusDelete = response.statusCode;
          res.redirect('/partidos');
        });
      });
    });
}
