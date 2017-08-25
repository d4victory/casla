var moment = require('moment');

module.exports = function (app, isAdmin, client) {

    app.get('/torneos', isAdmin, function(req, res) {
        client.get("/torneo", function (err, response, torneos) {
            client.get("/division", function (err, response, divisiones) {
                res.render('./ejs/torneos/torneos.ejs', {
                    message: req.flash('signupMessage'),
                    torneos: torneos,
                    divisiones: divisiones,
                    user: req.user,
                    resultado: req.session.statusDelete
                });
            });
        });
    });

    app.get('/agregarTorneos', isAdmin, function(req, res) {
        client.get("/division", function (err, response, divisiones) {
            res.render('./ejs/torneos/agregarTorneos.ejs', {
                user: req.user,
                divisiones: divisiones,
                message: req.flash('loginMessage')
            });
        });
    });

    app.post('/equiposTorneo', isAdmin, function(req, res) {
        client.get("/torneo/" + req.body.torneoid + "/equipos", function (err, response, data) {
            client.get("/division", function (err, response, divisiones) {
                res.render('./ejs/torneos/equiposTorneo.ejs', {
                    user: req.user,
                    divisiones: divisiones,
                    equipos: data.equipos,
                    torneo: data.torneo,
                    message: req.flash('loginMessage')
                });
            });
        });
    });

    app.post('/partidosTorneo', isAdmin, function(req, res) {
        client.get("/torneo/" + req.body.torneoid + "/partidos", function (err, response, data) {
            client.get("/division", function (err, response, divisiones) {
                client.get("/equipo", function (err, response, equipos) {
                    var equiposMap = {};
                    for (var i = 0; i < equipos.length; i++) {
                        equiposMap[equipos[i]._id] = equipos[i].nombre;
                    }
                    ;
                    res.render('./ejs/torneos/partidosTorneo.ejs', {
                        user: req.user,
                        divisiones: divisiones,
                        partidos: data.partidos,
                        equipos: equiposMap,
                        torneo: data.torneo,
                        moment: moment,
                        message: req.flash('loginMessage')
                    });
                });
            });
        });
    });

    app.post('/canchasTorneo', isAdmin, function(req, res) {
        client.get("/torneo/" + req.body.torneoid + "/canchas", function (err, response, data) {
            client.get("/cancha", function (err, response, canchas) {
                var canchasMap = {};
                for (var i = 0; i < canchas.length; i++) {
                    canchasMap[canchas[i]._id] = canchas[i].nombre;
                }
                res.render('./ejs/torneos/canchasTorneo.ejs', {
                    user: req.user,
                    canchas: canchasMap,
                    torneo: data.torneo,
                    moment: moment,
                    message: req.flash('loginMessage')
                });
            });
        });
    });

    app.post('/agregarTorneo', isAdmin, function(req, res) {
      var args = {
        data: req.body,
        headers: {
          "Content-Type": "application/json"
        }
      };

      console.log("ARGS", JSON.stringify(args, null, 2));

      client.post({url: "/torneo", body: req.body}, function (error, response, body) {
        if (error) {
          console.log("ERROR");
          console.log(error);
          console.log('something went wrong al agregar torneo', err.request.options);
        }

        console.log("POST /torneo");
        console.log('response statusCode:' + response.statusCode);
        console.log("body", body);
        res.redirect('/torneos');
      });
    });

    app.post('/deleteTorneo', isAdmin, function(req, res) {
      client.delete("/torneo/" + req.body.torneoid, function (err, response, data) {
        console.log("DELETE /torneo/" + req.body.torneoid);
        req.session.statusDelete = response.statusCode;
        res.redirect('/torneos');
      });
    });
}
