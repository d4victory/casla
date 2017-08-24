// var moment = require('moment');
var cfg = require('config');

module.exports = function(app,isAdmin) {

    app.get('/partidos', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
            client.get(cfg.nodeClientUrl+"/partido/numeros_fechas", function (numeros_fechas, response) {
                res.render('./ejs/partidos/partidos.ejs', { message: req.flash('signupMessage'), numeros_fechas:numeros_fechas,
                    user: req.user,divisiones:divisiones
                    ,resultado: req.session.statusDelete});
            });
        });
    });

    app.get('/partidosDelTorneo', isAdmin, function(req, res) {
        console.log('estoy en /partidosDelTorneo');
        client.get(cfg.nodeClientUrl+"/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
                res.render('./ejs/torneos/partidosTorneo.ejs', {user: req.user, divisiones:divisiones, torneo: torneo, message: req.flash('loginMessage')});
            });
        });
    });

    app.get('/agregarPartidos', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/torneo", function (data, response) {
            client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
                res.render('./ejs/partidos/agregarPartidos.ejs', {user: req.user, divisiones:divisiones, torneos: data, message: req.flash('loginMessage')});
            });
        });
    });

    app.post('/agregarPartido', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post(cfg.nodeClientUrl+"/partido", args, function (data, response) {
            console.log("POST /partidos");
            res.redirect('/partidos');
        });
    });

    app.post('/deletePartido', isAdmin, function(req, res) {
        client.delete(cfg.nodeClientUrl+"/partido/"+req.body.partidoid, function (data, response) {
            data.data["equipo1Old"] = data.equipo1Old;
            data.data["equipo2Old"] = data.equipo2Old;
            data.data["statusOld"] = data.statusOld;
            var args2 = {
                data:  data.data ,
                headers: { "Content-Type": "application/json" }
            };
            client.post(cfg.nodeClientUrl+"/posicionEquipo/updatePosicionEquipo/", args2, function (data, response) {
                console.log("DELETE /partido/"+req.body.partidoid);
                req.session.statusDelete = response.statusCode;
                res.redirect('/partidos');
            });
        });
    });
}
