module.exports = function(app) {
    
    var cfg = require('../config');
    
    app.get('/posicionesDeLaDivision/', function(req, res) {
        client.get("http://"+cfg.hostname+"/posicionEquipo/division/"+req.query.divisionid, function (posicionEquipo, response) {
            client.get("http://"+cfg.hostname+"/division/", function (divisiones, response) {
                client.get("http://"+cfg.hostname+"/division/"+req.query.divisionid, function (division, response) {
                    res.render('./ejs/divisiones/posicionesDeLaDivision.ejs', {user: req.user, posicionEquipo:posicionEquipo, divisiones: divisiones, division:division,message: req.flash('loginMessage')});
                });
            });
        });
    });
}
