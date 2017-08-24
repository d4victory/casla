var cfg = require('config');

module.exports = function(app,isAdmin) {

    app.post('/nuevaDivision', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/division", function (divisiones, response) {
        client.get(cfg.nodeClientUrl+"/torneo/"+req.body.torneoid, function (torneo, response) {
            res.render('./ejs/divisiones/agregarDivision.ejs', {user: req.user, divisiones:divisiones, torneo: torneo, message: req.flash('loginMessage')});
        });
        });
    });

    app.post('/agregarDivision', isAdmin, function(req, res) {
        var args = {
            data:  req.body ,
            headers: { "Content-Type": "application/json" }
        };
        client.post(cfg.nodeClientUrl+"/division", args, function (data, response) {
            res.redirect('/divisionesDelTorneo?torneoid='+data.torneo._id);
        });
    });

    app.get('/divisionesDelTorneo', isAdmin, function(req, res) {
        client.get(cfg.nodeClientUrl+"/torneo/"+req.query.torneoid, function (torneo, response) {
            client.get(cfg.nodeClientUrl+"/division/torneo/"+req.query.torneoid, function (divisiones, response) {
                res.render('./ejs/divisiones/divisionesDelTorneo.ejs', {user: req.user, divisiones: divisiones,
                    torneo:torneo,  message: req.flash('loginMessage')});
            });
        });

    });

    app.post('/deleteDivision', isAdmin, function(req, res) {
        client.delete(cfg.nodeClientUrl+"/division/"+req.body.divisionid, function (data, response) {
            req.session.statusDelete = response.statusCode;
            res.redirect('/divisionesDelTorneo?torneoid='+data);
        });
    });
}
