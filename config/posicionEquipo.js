var cfg = require('config');

module.exports = function(app) {

    app.get('/posicionesDeLaDivision/', function(req, res) {
        client.get(cfg.nodeClientUrl+"/posicionEquipo/division/"+req.query.divisionid, function (posicionEquipo, response) {
            client.get(cfg.nodeClientUrl+"/division/", function (divisiones, response) {
                client.get(cfg.nodeClientUrl+"/division/"+req.query.divisionid, function (division, response) {
                    res.render('./ejs/divisiones/posicionesDeLaDivision.ejs', {user: req.user, posicionEquipo:posicionEquipo, divisiones: divisiones, division:division,message: req.flash('loginMessage')});
                });
            });
        });
    });
}
