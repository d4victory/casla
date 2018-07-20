module.exports = function(app,isAdmin, client) {

    app.post('/nuevaDivision', isAdmin, function(req, res) {
      client.get("/division", function (err, response, divisiones) {
        client.get("/torneo/"+req.body.torneoid, function (err, response, torneo) {
          res.render('./ejs/divisiones/agregarDivision.ejs', {user: req.user, divisiones:divisiones, torneo: torneo, message: req.flash('loginMessage')});
        });
      });
    });

    app.post('/agregarDivision', isAdmin, function(req, res) {
        client.post({url: "/division", body: req.body}, function (err, response, data) {
            console.log('ERROR TORNEO' + data.torneo);
            res.redirect('/divisionesDelTorneo?torneoid='+data.torneo._id);
        });
    });

    app.get('/divisionesDelTorneo', isAdmin, function(req, res) {
        client.get("/torneo/"+req.query.torneoid, function (err, response, torneo) {
            client.get("/division/torneo/"+req.query.torneoid, function (err, response, divisiones) {
                res.render('./ejs/divisiones/divisionesDelTorneo.ejs', {user: req.user, divisiones: divisiones,
                    torneo:torneo,  message: req.flash('loginMessage')});
            });
        });

    });

    app.post('/deleteDivision', isAdmin, function(req, res) {
        client.delete("/division/"+req.body.divisionid, function (err, response, data) {
            req.session.statusDelete = response.statusCode;
            res.redirect('/divisionesDelTorneo?torneoid='+data);
        });
    });
}
