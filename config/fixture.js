var cfg = require('config');

module.exports = function(app) {

    app.get('/fixture/', function(req, res) {
        client.get("http://"+cfg.hostname+"/fixture/division/"+req.query.divisionid, function (partidos, response) {
            client.get("http://"+cfg.hostname+"/division/", function (divisiones, response) {
                res.render('./ejs/fixture/fixture.ejs', {user: req.user, divisiones: divisiones,partidos:partidos, message: req.flash('loginMessage')});
            });
        });
    });
}
