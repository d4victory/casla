var cfg = require('config');

module.exports = function(app) {

    app.get('/fixture/', function(req, res) {
        client.get(cfg.nodeClientUrl+"/fixture/division/"+req.query.divisionid, function (partidos, response) {
            client.get(cfg.nodeClientUrl+"/division/", function (divisiones, response) {
                res.render('./ejs/fixture/fixture.ejs', {user: req.user, divisiones: divisiones,partidos:partidos, message: req.flash('loginMessage')});
            });
        });
    });
}
