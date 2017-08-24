var moment = require('moment');
var cfg = require('config'); //{hostname: 'keroku-casla.herokuapp.com'}

module.exports = function (app, isAdmin) {

    app.get('/torneos', isAdmin, function (req, res) {
        client.get(cfg.nodeClientUrl + "/torneo", function (torneos, response) {
            client.get(cfg.nodeClientUrl + "/division", function (divisiones, response) {
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

    app.get('/agregarTorneos', isAdmin, function (req, res) {
        client.get(cfg.nodeClientUrl + "/division", function (divisiones, response) {
            res.render('./ejs/torneos/agregarTorneos.ejs', {
                user: req.user,
                divisiones: divisiones,
                message: req.flash('loginMessage')
            });
        });
    });

    app.post('/equiposTorneo', isAdmin, function (req, res) {
        client.get(cfg.nodeClientUrl + "/torneo/" + req.body.torneoid + "/equipos", function (data, response) {
            client.get(cfg.nodeClientUrl + "/division", function (divisiones, response) {
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

    app.post('/partidosTorneo', isAdmin, function (req, res) {
        client.get(cfg.nodeClientUrl + "/torneo/" + req.body.torneoid + "/partidos", function (data, response) {
            client.get(cfg.nodeClientUrl + "/division", function (divisiones, response) {
                client.get(cfg.nodeClientUrl + "/equipo", function (equipos, response) {
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

    app.post('/canchasTorneo', isAdmin, function (req, res) {
        client.get(cfg.nodeClientUrl + "/torneo/" + req.body.torneoid + "/canchas", function (data, response) {
            client.get(cfg.nodeClientUrl + "/cancha", function (canchas, response) {
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

    app.post('/agregarTorneo', isAdmin, function (req, res) {
        var args = {
          data: req.body,
          headers: {
            "Content-Type": "application/json",
            "Host": "keroku-casla.herokuapp.com"
          }
        };

        console.log("VER ACA " + "http://" + cfg.hostname + "/torneo", JSON.stringify(args, null, 2));

        try {
          client.post(cfg.nodeClientUrl + "/torneo", args, function (data, response) {
            console.log("POST /torneo");
            console.log('response statusCode:' + response.statusCode);
            res.redirect('/torneos');
          })
          .on('error', function (err) {
            console.log('ERROOOOOOR')
            console.log(err)
            console.log('something went wrong al agregar torneo', err.request.options);
          });;
        } catch (err) {
          console.log('Hubo un error al agregar el torneo');
          console.log(err);
        }

    });

    app.post('/deleteTorneo', isAdmin, function (req, res) {
        client.delete(cfg.nodeClientUrl + "/torneo/" + req.body.torneoid, function (data, response) {
            console.log("DELETE /torneo/" + req.body.torneoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/torneos');
        });
    });
}
