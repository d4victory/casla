var moment = require('moment');

module.exports = function(app, isAdmin) {
    
    var cfg = require('../config');
   
    app.get('/torneos', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/torneo", function (torneos, response) {
            client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
                res.render('./ejs/torneos/torneos.ejs', {
                    message: req.flash('signupMessage'),
                    torneos: torneos,
                    divisiones : divisiones,
                    user: req.user,
                    resultado: req.session.statusDelete
                });
            });
        });
    });

    app.get('/agregarTorneos', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
            res.render('./ejs/torneos/agregarTorneos.ejs', {user: req.user,divisiones:divisiones, message: req.flash('loginMessage')});
        });
    });

    app.post('/equiposTorneo', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/torneo/"+req.body.torneoid+"/equipos", function (data, response) {
            client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
            res.render('./ejs/torneos/equiposTorneo.ejs', {user: req.user,divisiones:divisiones, equipos:data.equipos, torneo: data.torneo, message: req.flash('loginMessage')});
        });
        });
    });

    app.post('/partidosTorneo', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/torneo/"+req.body.torneoid+"/partidos", function (data, response) {
            client.get("http://"+cfg.hostname+"/division", function (divisiones, response) {
            client.get("http://"+cfg.hostname+"/equipo", function (equipos, response) {
                var equiposMap =  {};
                for (var i = 0; i < equipos.length; i++) {
                    equiposMap[equipos[i]._id] = equipos[i].nombre;
                };
                res.render('./ejs/torneos/partidosTorneo.ejs', {user: req.user,divisiones:divisiones, partidos:data.partidos, equipos:equiposMap, torneo: data.torneo, moment:moment, message: req.flash('loginMessage')});
            });
            });
        });
    });

    app.post('/canchasTorneo', isAdmin, function(req, res) {
        client.get("http://"+cfg.hostname+"/torneo/"+req.body.torneoid+"/canchas", function (data, response) {
            client.get("http://"+cfg.hostname+"/cancha", function (canchas, response) {
                var canchasMap = {};
                for(var i =0; i<canchas.length;i++){
                    canchasMap[canchas[i]._id] = canchas[i].nombre;
                }
                res.render('./ejs/torneos/canchasTorneo.ejs', {user: req.user, canchas:canchasMap, torneo: data.torneo, moment:moment, message: req.flash('loginMessage')});
            });
        });
    });

    app.post('/agregarTorneo', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json",
                      "transfer-encoding": "chunked"
                     }
        };
        client.post("http://"+cfg.hostname+"/torneo", args, function (data, response) {
            console.log("POST /torneo");
            res.redirect('/torneos');
        });
    });

    app.post('/deleteTorneo', isAdmin, function(req, res) {
        client.delete("http://"+cfg.hostname+"/torneo/"+req.body.torneoid, function (data, response) {
            console.log("DELETE /torneo/"+req.body.torneoid);
            req.session.statusDelete = response.statusCode;
            res.redirect('/torneos');
        });
    });
}
