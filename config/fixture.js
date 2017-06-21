/**
 * Created by franc on 09/06/2017.
 */
module.exports = function(app) {
    
    var cfg = require('../config');
    
    app.get('/fixture/', function(req, res) {
        client.get("http://"+cfg.hostname+"/fixture/division/"+req.query.divisionid, function (partidos, response) {
            client.get("http://"+cfg.hostname+"/division/", function (divisiones, response) {
                res.render('./ejs/fixture/fixture.ejs', {user: req.user, divisiones: divisiones,partidos:partidos, message: req.flash('loginMessage')});
            });
        });
    });
}
